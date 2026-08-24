import type { MDXComponents } from 'mdx/types'

/**
 * Styling for the rendered MDX body of a post — matches the prose treatment in
 * Personal-Website.dc.html (16.5px / #c7c7c7 / line-height 1.75, 18px gap).
 */
export const mdxComponents: MDXComponents = {
  p: (props) => <p className="m-0 text-[16.5px] leading-[1.75] text-[#c7c7c7]" {...props} />,
  h2: (props) => <h2 className="m-0 mt-2.5 text-[22px] font-bold text-text-primary" {...props} />,
  h3: (props) => <h3 className="m-0 mt-2.5 text-[18px] font-bold text-text-primary" {...props} />,
  ul: (props) => (
    <ul className="m-0 flex list-disc flex-col gap-2 pl-5 text-[16.5px] leading-[1.75] text-[#c7c7c7]" {...props} />
  ),
  ol: (props) => (
    <ol className="m-0 flex list-decimal flex-col gap-2 pl-5 text-[16.5px] leading-[1.75] text-[#c7c7c7]" {...props} />
  ),
  li: (props) => <li className="m-0" {...props} />,
  a: (props) => <a className="text-accent underline underline-offset-2" {...props} />,
  strong: (props) => <strong className="font-bold text-text-primary" {...props} />,
  blockquote: (props) => (
    <blockquote className="m-0 border-l-2 border-border-hover pl-4 text-[16.5px] leading-[1.75] text-text-muted" {...props} />
  ),
  code: (props) => (
    <code className="rounded-[6px] border border-border bg-card px-1.5 py-0.5 text-[14.5px] text-accent" {...props} />
  ),
  pre: (props) => (
    <pre className="m-0 overflow-x-auto rounded-input border border-border bg-card p-4 text-[14px] leading-[1.6]" {...props} />
  ),
  hr: (props) => <hr className="m-0 border-0 border-t border-border" {...props} />,
}
