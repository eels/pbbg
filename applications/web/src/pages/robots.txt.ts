import type { GetServerSidePropsContext } from 'next';

const contextTxt = `
User-agent: *
Disallow: /
`;

export default function Robots() {
  return undefined;
}

export async function getServerSideProps({ res }: GetServerSidePropsContext) {
  res.setHeader('Content-Type', 'text/plain');
  res.write(contextTxt.trim());
  res.end();

  return {
    props: {},
  };
}
