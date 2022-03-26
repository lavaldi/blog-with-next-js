import { allArticles } from ".contentlayer/generated";
import Image from "next/image";
import Link from "next/link";
import { useMDXComponent } from "next-contentlayer/hooks";
import { parseISO, format } from "date-fns";

const mdxComponents = {
  Image,
};

export default function Article({ article }) {
  const MDXContent = useMDXComponent(article.body.code);

  return (
    <main className="flex flex-col justify-center pt-32 pb-40">
      <article className="flex flex-col justify-center items-start max-w-2xl mx-auto mb-16 w-full">
        <small>
          <Link href="/">
            <a>👈 Back to home</a>
          </Link>
        </small>

        <h1 className="font-bold text-3xl md:text-5xl tracking-tight mb-4">
          {article.title}
        </h1>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center w-full mt-2">
          <div className="flex items-center">
            <Image
              alt="Claudia Valdivieso"
              height={24}
              width={24}
              src="/lavaldi.jpg"
              className="rounded-full"
            />

            <p className="text-sm ml-2 text-gray-500">
              {"Claudia Valdivieso / "}

              {format(parseISO(article.date), "MMMM dd, yyyy")}
            </p>
          </div>

          <p className="text-sm text-gray-500 min-w-32 mt-2 md:mt-0">
            {article.readingTime.text}
          </p>
        </div>

        <div className="prose dark:prose-dark max-w-none w-full mt-5 mb-8">
          <MDXContent components={mdxComponents} />
        </div>
      </article>
    </main>
  );
}

export async function getStaticPaths() {
  return {
    paths: allArticles.map((a) => ({ params: { slug: a.slug } })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const article = allArticles.find((article) => article.slug === params?.slug);

  return { props: { article } };
}
