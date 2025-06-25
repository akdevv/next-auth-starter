import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { notFound } from "next/navigation";
import MDXContent from "@/components/docs/mdx-content";

interface DocsPageProps {
	params: { slug: string[] };
}

async function getDocBySlug(slug: string[]) {
	const filePath = path.join(
		process.cwd(),
		"content/md",
		`${slug.join("/")}.mdx`
	);

	try {
		const fileContents = await fs.promises.readFile(filePath, "utf8");
		const { data, content } = matter(fileContents);
		return { metadata: data, content };
	} catch (err) {
		return null;
	}
}

export default async function DocsPage({ params }: DocsPageProps) {
	const slug = (await params).slug;
	const doc = await getDocBySlug(slug);

	if (!doc) notFound();

	return <MDXContent doc={doc} />;
}
