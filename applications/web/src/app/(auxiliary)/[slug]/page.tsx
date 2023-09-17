import ContentContainer from '@/ui/components/atoms/content-container';
import { allAuxiliaries } from 'contentlayer/generated';
import { decorateSEOMetaTitle } from '@pbbg/ui/src/utilities/seo';
import { useMDXComponent } from 'next-contentlayer/hooks';

export interface AuxiliaryProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  return allAuxiliaries.map((auxiliary) => ({ slug: auxiliary.slug }));
}

function findAuxiliaryBySlug(slug: string) {
  const auxiliary = allAuxiliaries.find((auxiliary) => {
    return auxiliary.slug === slug;
  });

  if (!auxiliary) {
    throw new Error(`Auxiliary not found for slug: ${slug}`);
  }

  return auxiliary;
}

export function generateMetadata({ params }: AuxiliaryProps) {
  const auxiliary = findAuxiliaryBySlug(params.slug);

  return {
    title: decorateSEOMetaTitle(auxiliary.title),
  };
}

export default function Auxiliary({ params }: AuxiliaryProps) {
  const auxiliary = findAuxiliaryBySlug(params.slug);
  const MDXContent = useMDXComponent(auxiliary.body.code);

  return (
    <article>
      <ContentContainer>
        <div>
          <h1>{auxiliary.title}</h1>
        </div>
        <MDXContent />
      </ContentContainer>
    </article>
  );
}
