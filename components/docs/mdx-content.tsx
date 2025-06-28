"use client";

import { MDXRemote } from "next-mdx-remote/rsc";
import rehypeHighlight from "rehype-highlight";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import { useState } from "react";
import { FaCheck, FaRegFile } from "react-icons/fa";
import { BiLogoTypescript } from "react-icons/bi";
import { LuCopy } from "react-icons/lu";
import { VscJson } from "react-icons/vsc";
import { SiPrisma } from "react-icons/si";

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

interface MDXOptions {
	mdxOptions: {
		remarkPlugins: [];
		rehypePlugins: [];
	};
}

type CodeBlockType = {
	headerIcon: React.ReactNode | null;
	headerLabel: React.ReactNode | null;
	isTerminal?: boolean;
};

const getCodeBlockType = (match: RegExpExecArray | null): CodeBlockType => {
	if (!match) return { headerIcon: null, headerLabel: null };

	const language = match[1];
	let result: CodeBlockType = { headerIcon: null, headerLabel: null };

	switch (language) {
		case "env":
			result = {
				headerIcon: (
					<span className="mr-2">
						<FaRegFile />
					</span>
				),
				headerLabel: (
					<span className="text-sm font-semibold text-foreground">
						.env
					</span>
				),
			};
			break;
		case "shell":
		case "bash":
		case "sh":
		case "zsh":
		case "terminal":
			result = {
				headerIcon: (
					<span className="text-sm font-medium text-muted-foreground mr-2">
						&gt;_
					</span>
				),
				headerLabel: (
					<span className="text-sm font-semibold text-foreground">
						Terminal
					</span>
				),
				isTerminal: true,
			};
			break;
		case "json":
			result = {
				headerIcon: (
					<span className="mr-2">
						<VscJson />
					</span>
				),
				headerLabel: (
					<span className="text-sm font-semibold text-foreground">
						JSON
					</span>
				),
			};
			break;
		case "typescript":
			result = {
				headerIcon: (
					<span className="mr-2">
						<BiLogoTypescript />
					</span>
				),
				headerLabel: (
					<span className="text-sm font-semibold text-foreground">
						TypeScript
					</span>
				),
			};
			break;
		case "prisma":
			result = {
				headerIcon: (
					<span className="mr-2">
						<SiPrisma />
					</span>
				),
				headerLabel: (
					<span className="text-sm font-semibold text-foreground">
						schema.prisma
					</span>
				),
			};
			break;
	}

	return result;
};

function CodeComponent(props: React.HTMLAttributes<HTMLElement>) {
	const { children, className, ...rest } = props;
	const match = /language-(\w+)/.exec(className || "");
	const [copied, setCopied] = useState(false);

	const copyToClipboard = async () => {
		await navigator.clipboard.writeText(children as string);
		setCopied(true);
		setTimeout(() => setCopied(false), 2000);
	};

	const { headerIcon, headerLabel, isTerminal } = getCodeBlockType(match);

	if (headerIcon && headerLabel) {
		return (
			<div className="my-6 rounded-lg border border-border bg-card">
				<div className="flex items-center px-4 py-2 border-b border-border bg-muted rounded-t-lg">
					{headerIcon}
					{headerLabel}
				</div>
				<div className="relative group px-4 py-3">
					<pre className="overflow-x-auto bg-transparent p-0 m-0 border-0 shadow-none">
						<code
							className="text-[15px] font-mono text-foreground"
							{...rest}
						>
							{isTerminal && typeof children === "string"
								? children.replace(
										/\b(npx|npm|yarn)\b/g,
										(m) =>
											`<span style='color:var(--primary)'>${m}</span>`
									)
								: children}
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
			</div>
		);
	}

	return match ? (
		<div className="relative group">
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
}

const components = {
	h1: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
		<h1 className="text-2xl md:text-3xl font-bold mt-8 mb-4" {...props} />
	),
	h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
		<h2 className="text-xl md:text-2xl font-bold mt-8 mb-4" {...props} />
	),
	h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
		<h3 className="text-lg md:text-xl font-bold mt-6 mb-3" {...props} />
	),
	h4: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
		<h4 className="text-base md:text-lg font-bold mt-4 mb-2" {...props} />
	),
	p: (props: React.HTMLAttributes<HTMLParagraphElement>) => (
		<p className="my-4 text-base leading-7" {...props} />
	),
	ul: (props: React.HTMLAttributes<HTMLUListElement>) => (
		<ul className="list-disc pl-6 my-4 space-y-2" {...props} />
	),
	ol: (props: React.HTMLAttributes<HTMLOListElement>) => (
		<ol className="list-decimal pl-6 my-4 space-y-2" {...props} />
	),
	li: (props: React.HTMLAttributes<HTMLLIElement>) => (
		<li className="text-base leading-7" {...props} />
	),
	a: (props: React.HTMLAttributes<HTMLAnchorElement>) => (
		<a className="text-primary hover:underline" {...props} />
	),
	blockquote: (props: React.HTMLAttributes<HTMLQuoteElement>) => (
		<blockquote
			className="border-l-4 border-primary pl-4 italic my-4 text-muted-foreground"
			{...props}
		/>
	),
	code: CodeComponent,
	pre: (props: React.HTMLAttributes<HTMLPreElement>) => <pre {...props} />,
	table: (props: React.HTMLAttributes<HTMLTableElement>) => (
		<div className="overflow-x-auto my-6 rounded-lg border border-border">
			<table className="min-w-full divide-y divide-border" {...props} />
		</div>
	),
	th: (props: React.HTMLAttributes<HTMLTableHeaderCellElement>) => (
		<th className="px-4 py-2 bg-muted font-medium text-left" {...props} />
	),
	td: (props: React.HTMLAttributes<HTMLTableDataCellElement>) => (
		<td className="px-4 py-2 border-t text-sm" {...props} />
	),
	hr: (props: React.HTMLAttributes<HTMLHRElement>) => (
		<hr className="my-6 border-border" {...props} />
	),
};

interface MDXContentProps {
	doc: {
		metadata: {
			title?: string;
			description?: string;
			tags?: string[];
		};
		content: string;
	};
}

export default function MDXContent({ doc }: MDXContentProps) {
	return (
		<article className="max-w-5xl mx-auto px-2">
			<div className="prose dark:prose-invert max-w-none">
				{doc.metadata.title && (
					<h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2 mt-15">
						{doc.metadata.title}
					</h1>
				)}
				{doc.metadata.description && (
					<p className="text-lg md:text-xl text-muted-foreground mb-2">
						{doc.metadata.description}
					</p>
				)}
				{doc.metadata.tags && doc.metadata.tags.length > 0 && (
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
					options={options as MDXOptions}
				/>
			</div>
		</article>
	);
}
