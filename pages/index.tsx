import { GetStaticProps } from "next";
import React from "react";
// import { Htag, Button, P, Tag, Rating, Input, TextArea } from "../components";
import { withLayout } from "../layout/Layout";
import axios from "axios";
import { MenuItem } from '../interfaces/menu.interface';

function Home(): JSX.Element {

  return (
    <>
      <h1>Это начальная страница, воспользуйтесь, пожалуйста, меню</h1>


    </>
  );
}

export default withLayout(Home);


export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  const firstCategory = 0;
  const { data: menu } = await axios.post<MenuItem[]>(process.env.NEXT_PUBLIC_DOMAIN + '/api/top-page/find', {
    firstCategory
  });
  return {
    props: {
      menu,
      firstCategory
    }
  };
};

interface HomeProps extends Record<string, unknown> {
  menu: MenuItem[],
  firstCategory: number
}

