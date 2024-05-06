type Props = {
  text: string;
};

export default function HashTag({ text }: Props) {
  return (
    <div className="border rounded-xl w-max py-1 px-2">
      <h1 className="text-sm"># {text}</h1>
    </div>
  );
}
