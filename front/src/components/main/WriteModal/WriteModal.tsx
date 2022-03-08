import React, { useState, useCallback, Dispatch, SetStateAction } from 'react';
import { Button, Input } from 'antd';
import { useFormik } from 'formik';
import UploadImages from './UploadImages';
import { IPost } from '@customTypes/post';
import WriteTag from './WriteTag';
import { useAppDispatch } from '@store/hook';
import { addPost } from '@actions/post';
import * as U from './style';

interface WriteModalProps {
  setWriteModalState: Dispatch<SetStateAction<boolean>>;
}

const { TextArea } = Input;
const WriteModal: React.FunctionComponent<WriteModalProps> = ({ setWriteModalState }) => {
  const dispatch = useAppDispatch();
  const [gatherState, setGatherState] = useState(false);
  const [zepState, setZepState] = useState(false);
  const [tags, setTags] = useState<string[]>([]);
  const formik = useFormik({
    initialValues: { title: '', content: '', link: '', tags: [] },
    onSubmit: (values: IPost) => {
      values.tags = tags;
      dispatch(addPost(values));
      console.log(values);
      // alert(JSON.stringify(values, null, 2));
    },
  });

  const selectHandler = useCallback(
    (e) => {
      const { name } = e.target;
      if (name === 'gather') {
        setGatherState(true);
        setZepState(false);
      }
      if (name === 'zep') {
        setGatherState(false);
        setZepState(true);
      }
    },
    [gatherState, zepState],
  );
  const closeWriteModal = () => {
    setWriteModalState(false);
    document.body.style.overflow = 'unset';
  };

  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <U.Dim onClick={closeWriteModal} />
        <U.ModalWrapper>
          <U.Modal>
            <U.ModalContainer>
              <U.closeModalBtn onClick={closeWriteModal}>x</U.closeModalBtn>
              <h3>카테고리</h3>
              <U.SelectBtnWrapper>
                <U.SelectBtn type="button" onClick={selectHandler} name="gather" state={gatherState}>
                  Gathertown
                </U.SelectBtn>
                <U.SelectBtn type="button" onClick={selectHandler} name="zep" state={zepState}>
                  Zep
                </U.SelectBtn>
              </U.SelectBtnWrapper>
              <U.StyledLabel htmlFor="title">제목</U.StyledLabel>
              <Input
                id="title"
                name="title"
                onChange={formik.handleChange}
                value={formik.values.title}
                placeholder="제목을 입력해주세요."
              ></Input>
              <U.StyledLabel htmlFor="link">접속링크</U.StyledLabel>
              <Input
                id="link"
                name="link"
                onChange={formik.handleChange}
                value={formik.values.link}
                placeholder="접속링크를 입력해주세요."
              ></Input>
              <UploadImages />
              <U.StyledLabel htmlFor="content">내용</U.StyledLabel>
              <TextArea
                id="content"
                name="content"
                onChange={formik.handleChange}
                value={formik.values.content}
                rows={8}
                placeholder="메타버스 공간을 소개해주세요."
              />
              <U.StyledLabel htmlFor="tags">
                태그 <U.ExplainP>(*최대 5개)</U.ExplainP>
              </U.StyledLabel>
              <WriteTag setTags={setTags} tags={tags} />
              <U.SubmitBtn type="primary" htmlType="submit">
                등록하기
              </U.SubmitBtn>
            </U.ModalContainer>
          </U.Modal>
        </U.ModalWrapper>
      </form>
    </>
  );
};

export default WriteModal;
