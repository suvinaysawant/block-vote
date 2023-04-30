import React, { useState, useEffect, useCallback, useContext} from 'react'
import { useRouter } from 'next/router';
import { useDropzone } from 'react-dropzone';
import Image from 'next/image';

// Internel Import
import { VotingContext } from '@/context/Voter';
import Style from '../styles/allowedVoter.module.css';
import images from "../assets";
import Button from '../components/Button/Button';
import Input from  '../components/Input/Input';


const allowedVoters = () => {
  const [fileUrl, setFileUrl] = useState(null);
  const [formInput, setFormInput] = useState({
    name: "",
    address:"",
    position:""
  });

  return <div></div>;
};



export default allowedVoters;