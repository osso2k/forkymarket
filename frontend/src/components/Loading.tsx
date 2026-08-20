const Loading = () => {
  return (
    <div className="flex flex-col items-center justify-center mt-12">
      <div className="flex gap-2">
        <span className="w-4 h-4 bg-mauve-500 rounded-full animate-bounce [animation-delay:-0.3s]" />
        <span className="w-4 h-4 bg-mauve-500 rounded-full animate-bounce [animation-delay:-0.15s]" />
        <span className="w-4 h-4 bg-mauve-500 rounded-full animate-bounce" />
      </div>
    </div>
  )
}

export default Loading
