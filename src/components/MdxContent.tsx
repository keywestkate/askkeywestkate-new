import { MDXRemote } from "next-mdx-remote/rsc";
import type { MDXRemoteProps } from "next-mdx-remote/rsc";

const components: MDXRemoteProps["components"] = {
  h1: (props) => (
    <h1
      className="font-display text-[clamp(2.5rem,5vw,4rem)] leading-[0.98] tracking-[-0.035em] text-ink-950 mt-16 mb-6"
      {...props}
    />
  ),
  h2: (props) => (
    <h2
      className="font-display text-[clamp(1.75rem,3.2vw,2.5rem)] leading-[1.05] tracking-[-0.025em] text-ink-950 mt-14 mb-5"
      {...props}
    />
  ),
  h3: (props) => (
    <h3
      className="font-display text-[1.35rem] leading-snug tracking-tight text-ink-950 mt-10 mb-3"
      {...props}
    />
  ),
  p: (props) => (
    <p className="text-[1.02rem] leading-[1.75] text-ink-800 my-5" {...props} />
  ),
  a: (props) => (
    <a
      className="text-gulf-700 underline underline-offset-4 hover:text-ink-950"
      {...props}
    />
  ),
  ul: (props) => (
    <ul className="my-5 list-disc space-y-2 pl-6 text-ink-800" {...props} />
  ),
  ol: (props) => (
    <ol className="my-5 list-decimal space-y-2 pl-6 text-ink-800" {...props} />
  ),
  li: (props) => <li className="leading-relaxed" {...props} />,
  blockquote: (props) => (
    <blockquote
      className="my-10 border-l-2 border-gulf-500 pl-6 font-display text-[clamp(1.4rem,2.4vw,1.9rem)] leading-[1.25] italic text-ink-900"
      {...props}
    />
  ),
  hr: () => <hr className="my-14 border-ink-200" />,
  code: (props) => (
    <code
      className="rounded bg-paper-soft px-1.5 py-0.5 text-[0.92em] text-ink-900"
      {...props}
    />
  ),
  strong: (props) => (
    <strong className="font-semibold text-ink-950" {...props} />
  ),
  em: (props) => <em className="italic" {...props} />,
};

export function MdxContent({ source }: { source: string }) {
  return <MDXRemote source={source} components={components} />;
}
