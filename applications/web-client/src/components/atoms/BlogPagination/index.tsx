import * as Styled from 'components/atoms/BlogPagination/styled';
import ConditionalRender from 'components/utilities/ConditionalRender';
import Link from 'next/link';
import { useResourceString } from 'hooks/use-resource-string';

interface BlogPaginationProps {
  current: number;
  total: number;
}

export default function BlogPagination({ current, total }: BlogPaginationProps) {
  const { t } = useResourceString();

  const potentialPrevHref = `/blog/${current !== 2 ? current - 1 : ''}`;
  const potentialNextHref = `/blog/${current + 1}`;

  return (
    <Styled.Wrapper>
      <ConditionalRender condition={current !== 1}>
        {() => (
          <Link href={potentialPrevHref}>
            <a>{t('blog:pagination.previous')}</a>
          </Link>
        )}
      </ConditionalRender>
      <ConditionalRender condition={current !== total}>
        {() => (
          <Link href={potentialNextHref}>
            <a>{t('blog:pagination.next')}</a>
          </Link>
        )}
      </ConditionalRender>
    </Styled.Wrapper>
  );
}
