import { loadMyPosts } from '@actions/user';
import AppLayout from '@components/AppLayout/AppLayout';
import DetailModalContainer from '@components/detailModal/DetailModalContainer';
import MyPost from '@components/mypage/MyPost';
import Profile from '@components/mypage/Profile';
import ProfileEditModal from '@components/profileEditModal/ProfileEditModal';
import { IAuthorInfo } from '@customTypes/user';
import { getAuthorInfo, logOut, saveAccessToken } from '@slices/userSlice';
import wrapper from '@store/configureStore';
import { useAppSelector } from '@store/hook';
import { Layout } from 'antd';
import Head from 'next/head';
import React, { useState } from 'react';
import styled from 'styled-components';

const mypage = () => {
  const [detailModalState, setDetailModalState] = useState(false);
  const [editModalState, setEditModalState] = useState(false);
  const author = useAppSelector((state) => state.userSlice.authorInfo);
  return (
    <>
      <Head>
        <title>{`${author?.username}님의 소개 - 모두메타 | 메타버스 공유 플랫폼`}</title>
      </Head>
      {detailModalState && <DetailModalContainer />}
      {editModalState && <ProfileEditModal setEditModalState={setEditModalState} />}
      <AppLayout>
        <>
          <StyledLayout>
            <Profile setEditModalState={setEditModalState} />
            <MyPost setDetailModalState={setDetailModalState} />
          </StyledLayout>
        </>
      </AppLayout>
    </>
  );
};

export default mypage;

const StyledLayout = styled(Layout)`
  align-items: center;
  width: 1440px;
  background: white;

  @media screen and (max-width: 1650px) {
    width: 75vw;
  }
`;

export const getServerSideProps = wrapper.getServerSideProps((store) => async (ctx) => {
  store.dispatch(getAuthorInfo(ctx.query as unknown as IAuthorInfo));
  await store.dispatch(
    loadMyPosts({
      userId: store.getState().userSlice.authorInfo?.userId as number,
      pageNum: ctx.query.page as string,
      category: ctx.query.category as string,
      keyword: ctx.query.search as string,
      filter: ctx.query.filter as string,
    }),
  );
  return { props: {} };
});
