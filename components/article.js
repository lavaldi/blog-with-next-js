import Link from "next/link";
import { parseISO, format } from "date-fns";

export default function Article({ article }) {
  const { slug, date, title, readingTime } = article;
  return (
    <div
      className="pt-5 p-8 rounded-3xl border-2 shadow-lg border-purple-300 bg-purple-50 flex flex-col justify-between"
    >
      <Link href={`/blog/${slug}`}>
        <a className="text-2xl">{title}</a>
      </Link>
      <div className="mt-5 flex justify-between align-center">
        <small>{readingTime.text}</small>
        <small>{format(parseISO(date), "MMM dd, yyyy")}</small>
      </div>
    </div>
  );
}
