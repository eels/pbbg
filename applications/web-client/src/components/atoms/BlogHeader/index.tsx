import * as Styled from './styled';
import Emoji from 'a11y-react-emoji';
import { PostData } from 'types/post';
import { format, parse } from 'date-fns';

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
