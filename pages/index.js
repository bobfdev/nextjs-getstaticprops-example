import path from 'path';
import fs from 'fs/promises';
import Link from 'next/link';

export default function HomePage(props) {
  const { products } = props;

  return (
    <ul>
      {products.map((product) => (
        <li key={product.id}>
          <Link href={`/products/${product.id}`}>{product.title}</Link>
        </li>
      ))}
    </ul>
  );
}

export async function getStaticProps(context) {
  // data because the data folder is the location of data we are looking for
  // dummy-data.json is the file we need to use for this path
  const filePath = path.join(process.cwd(), 'data', 'dummy-data.json');
  const jsonData = await fs.readFile(filePath);
  // JSON.parse converts the jsonData into a regular javascript object
  const data = JSON.parse(jsonData);

  if (!data) {
    return {
      redirect: {
        destination: '/no-data' 
      }
    }
  }

  if (data.products.length === 0) {
    return { notFound: true };
  }


  // Must "return" with a "props" key when using getStaticProps
  return {
    props: {
      // products: [{ id: 'p1', title: 'Product 1' }],
      products: data.products
    },
    // Amount is time in seconds Nextjs should wait until regenerating this page
    // Page is regenerated at most by how many seconds value is set at
    revalidate: 10,
    // notFound generates a 404 page
    // notFound: true
    // redirect allows to redirect to another page/route
    // redirect:
  };
}