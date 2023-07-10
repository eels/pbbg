import type { GetServerSidePropsContext } from 'next';

const contextTxt = `
/* --- TEAM ------------------------------------- */

Webmaster: Liam Howell
Website: https://liam.codes

/* --- SITE ------------------------------------- */

Doctype: HTML5
Language: English
Last update: ${new Date().toUTCString()}
`;

export default function Humans() {
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
