import { useMutation } from '@apollo/client';
import { gql } from 'apollo-boost';
import axios from 'axios';
import { useState } from 'react';
import styled from 'styled-components';
import useInput from '../Hooks/useInput';
import { FEED_QUERY } from './Feed';

const Container = styled.div``;

const UPLOAD = gql`
  mutation upload($caption: String!, $location: String, $files:[String!]!){
    upload(caption: $caption, files: $files, location: $location){
      id
      caption
      location
    }
  }
`;

const Upload = () => {
  const [files, setFiles] = useState([]);
  const caption = useInput("");
  const locationInput = useInput("");

  const [uploadMutation] = useMutation(UPLOAD, {
    refetchQueries: () => [{ query: FEED_QUERY }]
  })

  const onClick = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", files);
    try {
      const { data: { location } } = await axios({
        method: "POST",
        url: "http://localhost:4000/api/upload",
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });
      const { data: { upload } } = await uploadMutation({
        variables: { caption: caption.value, location: locationInput.value, files: [location] }
      });
      if (upload) {
        window.location = "/";
      }
    } catch (e) {
      console.log(e);
      alert("Can't upload");
    }
  }

  const onChange = (e) => {
    setFiles(e.target.files[0]);
  }
  return <Container>
    <form name="file" encType="multipart/form-data">
      <input type="file" name="file" onChange={onChange} />
      <input placeholder="caption" name="caption" onChange={caption.onChange} value={caption.value} />
      <input placeholder="location" name="locationInput" onChange={locationInput.onChange} value={locationInput.value} />
      <button onClick={onClick}>Upload</button>
    </form>
  </Container>
}

export default Upload;