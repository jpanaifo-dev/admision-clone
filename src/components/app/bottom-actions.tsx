
interface BottomActionsProps {
  content: JSX.Element;
}

export const BottomActions = (props: BottomActionsProps) => {
  const { content } = props;

  return (
    <footer className="fixed bottom-0 w-full flex right-0 justify-center bg-white shadow-lg border-t-1">
      <div className="flex justify-end py-4 gap-4 w-full px-4 md:px-8 lg:px-16 xl:px-28">
        {content}
      </div>
    </footer>
  );
};
