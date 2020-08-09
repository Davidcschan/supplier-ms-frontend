import React, { useState, useEffect } from "react";
import Fab from "@material-ui/core/Fab";
import Dns from "@material-ui/icons/Dns";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";

const CREATE_AUTH = gql`
  mutation CreateAuth($data: AuthCreateInput!) {
    createAuth(data: $data) {
      id
    }
  }
`;

function XeroCallback({ match, location }) {
  return <div>Loading...</div>;
}

export default XeroCallback;
