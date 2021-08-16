// Shout out @hyunseob
import {
  cloneElement,
  createContext,
  ReactNode,
  isValidElement,
  useState,
  ReactElement,
  useCallback,
  ComponentType,
  useContext,
  useMemo,
  useRef,
} from 'react';

interface CommonDialogProps {
  open: boolean;
  onClose: () => void;
}

type RenderFunction<T> = (event: {
  onConfirm: () => void;
  onCancel: () => void;
}) => ReactElement | ComponentType<T>;
type DialogOpen<P extends CommonDialogProps = CommonDialogProps> = (
  render: RenderFunction<P>
) => Promise<boolean>;

interface Props {
  children: ReactNode;
}

interface DialogContextValue {
  open: DialogOpen;
}

export const DialogContext = createContext<DialogContextValue>({
  open: () => {
    throw new Error('Need to initialize DialogContext');
  },
});

// eslint-disable-next-line @typescript-eslint/no-empty-function
const noop = () => {};

function DialogProvider({ children }: Props) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogNode, setDialogNode] = useState<ReactNode>(null);

  const resolver = useRef<(result: boolean) => void>(noop);

  const handleConfirm = useCallback(() => {
    resolver.current?.(true);
    setIsDialogOpen(false);
  }, []);

  const handleCancel = useCallback(() => {
    resolver.current?.(false);
    setIsDialogOpen(false);
  }, []);

  const open = useCallback(
    <T extends CommonDialogProps>(
      render: RenderFunction<T>
    ): Promise<boolean> => {
      return new Promise<boolean>(resolve => {
        resolver.current = resolve;

        const element = render({
          onConfirm: handleConfirm,
          onCancel: handleCancel,
        });

        setDialogNode(element);
        setIsDialogOpen(true);
      });
    },
    [handleCancel, handleConfirm]
  );

  const context = useMemo((): DialogContextValue => {
    return { open };
  }, [open]);

  return (
    <DialogContext.Provider value={context}>
      {children}
      {isValidElement(dialogNode)
        ? cloneElement(dialogNode, {
            onClose: handleCancel,
            ...dialogNode.props,
            open: isDialogOpen,
          })
        : null}
    </DialogContext.Provider>
  );
}

export function useDialog() {
  return useContext(DialogContext);
}

export { DialogProvider };
