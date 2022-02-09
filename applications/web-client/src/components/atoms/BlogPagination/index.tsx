import * as Styled from './styled';
import Link from 'next/link';

interface BlogPaginationProps {
  current: number;
  total: number;
}

export default function BlogPagination({ current, total }: BlogPaginationProps) {
  const potentialPrevHref = `/blog/${current !== 2 ? current - 1 : ''}`;
  const potentialNextHref = `/blog/${current + 1}`;

  return (
    <Styled.Wrapper>
      {current !== 1 && (
        <Link href={potentialPrevHref}>
          <a>Previous</a>
        </Link>
      )}

      {current !== total && (
        <Link href={potentialNextHref}>
          <a>Next</a>
        </Link>
      )}
    </Styled.Wrapper>
  );
}
