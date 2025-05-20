"use client";

import { MDXRemote } from "next-mdx-remote/rsc";
import rehypeHighlight from "rehype-highlight";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import { useState } from "react";
import { FaCheck } from "react-icons/fa";
import { LuCopy } from "react-icons/lu";

import "highlight.js/styles/atom-one-dark.css";

const options = {
	mdxOptions: {
		remarkPlugins: [],
		rehypePlugins: [
			rehypeHighlight,
			rehypeSlug,
			[
				rehypeAutolinkHeadings,
				{
					properties: {
						className: ["anchor"],
					},
				},
			],
		],
	},
};

const components = {
	h1: (props: any) => (
		<h1 className="text-2xl md:text-3xl font-bold mt-8 mb-4" {...props} />
	),
	h2: (props: any) => (
		<h2 className="text-xl md:text-2xl font-bold mt-8 mb-4" {...props} />
	),
	h3: (props: any) => (
		<h3 className="text-lg md:text-xl font-bold mt-6 mb-3" {...props} />
	),
	h4: (props: any) => (
		<h4 className="text-base md:text-lg font-bold mt-4 mb-2" {...props} />
	),
	p: (props: any) => <p className="my-4 text-base leading-7" {...props} />,
	ul: (props: any) => (
		<ul className="list-disc pl-6 my-4 space-y-2" {...props} />
	),
	ol: (props: any) => (
		<ol className="list-decimal pl-6 my-4 space-y-2" {...props} />
	),
	li: (props: any) => <li className="text-base leading-7" {...props} />,
	a: (props: any) => (
		<a className="text-primary hover:underline" {...props} />
	),
	blockquote: (props: any) => (
		<blockquote
			className="border-l-4 border-primary pl-4 italic my-4 text-muted-foreground"
			{...props}
		/>
	),
	code: (props: any) => {
		const { children, className, ...rest } = props;
		const match = /language-(\w+)/.exec(className || "");
		const [copied, setCopied] = useState(false);

		const copyToClipboard = async () => {
			await navigator.clipboard.writeText(children as string);
			setCopied(true);
			setTimeout(() => setCopied(false), 2000);
		};

		return match ? (
			<div className="relative group ">
				<pre className="overflow-x-auto rounded-lg my-4" {...rest}>
					<code className={className} {...rest}>
						{children}
					</code>
				</pre>
				<div className="absolute top-2 right-2 rounded-md bg-background">
					<button
						onClick={copyToClipboard}
						className="p-2 rounded-md bg-accent/10 hover:bg-accent/20 transition-colors cursor-pointer"
						aria-label="Copy code"
					>
						{copied ? (
							<FaCheck className="h-4 w-4 text-chart-3" />
						) : (
							<LuCopy className="h-4 w-4 text-muted-foreground" />
						)}
					</button>
				</div>
			</div>
		) : (
			<code {...rest}>{children}</code>
		);
	},
	pre: (props: any) => <pre {...props} />,
	table: (props: any) => (
		<div className="overflow-x-auto my-6 rounded-lg border border-border">
			<table className="min-w-full divide-y divide-border" {...props} />
		</div>
	),
	th: (props: any) => (
		<th className="px-4 py-2 bg-muted font-medium text-left" {...props} />
	),
	td: (props: any) => (
		<td className="px-4 py-2 border-t text-sm" {...props} />
	),
	hr: (props: any) => <hr className="my-6 border-border" {...props} />,
};

interface MDXContentProps {
	doc: { metadata: any; content: string };
}

export default function MDXContent({ doc }: MDXContentProps) {
	return (
		<article className="max-w-5xl mx-auto px-2">
			<div className="prose dark:prose-invert max-w-none">
				<h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2 mt-15">
					{doc.metadata.title}
				</h1>
				{doc.metadata.description && (
					<p className="text-lg md:text-xl text-muted-foreground mb-2">
						{doc.metadata.description}
					</p>
				)}
				{doc.metadata.tags && (
					<div className="flex flex-wrap gap-2 mb-8">
						{doc.metadata.tags.map((tag: string) => (
							<span
								key={tag}
								className="bg-muted px-3 py-1 rounded-full text-sm"
							>
								# {tag}
							</span>
						))}
					</div>
				)}
				<hr className="my-6" />
				<MDXRemote
					source={doc.content}
					components={components}
					options={options as any}
				/>
			</div>
		</article>
	);
}
