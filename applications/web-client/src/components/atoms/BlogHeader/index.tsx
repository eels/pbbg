import * as Styled from 'components/atoms/BlogHeader/styled';
import Emoji from 'a11y-react-emoji';
import { format, parse } from 'date-fns';
import type { PostData } from 'types/post';

interface BlogHeaderProps {
  data: PostData;
}

export default function BlogHeader({ data }: BlogHeaderProps) {
  const parsedDate = parse(data.date.toString(), 'yyyyMMddHHmm', new Date());

  return (
    <Styled.Wrapper>
      <Styled.Headline>{data.headline}</Styled.Headline>
      <Styled.MetaInformation>
        <Styled.MetaInformationItem>
          <Emoji symbol='🗓' />
          <div>{format(parsedDate, 'LLLL do yyyy')}</div>
        </Styled.MetaInformationItem>
        <Styled.MetaInformationItem>
          <Emoji symbol='⏱' />
          <div>{data.timeToRead} minute read</div>
        </Styled.MetaInformationItem>
      </Styled.MetaInformation>
    </Styled.Wrapper>
  );
}
