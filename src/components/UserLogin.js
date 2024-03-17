import React, { useEffect, useState } from "react";
import { Form, Input, Button, Select } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { fetchgetRoomAccess } from "../redux/Slices/getRoomAccess";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const { Option } = Select;

const MyForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [ID, setID] = useState(null);

  const token = Cookies.get("useToken") 
  const { data: getRoomAccess, status } = useSelector(
    (state) => state.getRoomAccess
  );
  const onFinish = (values) => {
    const id = values.yourName;
    dispatch(fetchgetRoomAccess({ id }));
  };


  console.log(status)

  useEffect(() => {
    if (status && ID) {
      navigate(`/roomselection/${ID}`);
    }
  }, [getRoomAccess]);

  return (
    <div className="code-css">
      <h3>Do you have code ?</h3>
      <Form
        name="basic"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        style={{ maxWidth: 400, margin: "auto" }}
      >
        <Form.Item
          label="Enter Code"
          name="yourName"
          rules={[{ required: true, message: "Please input your code!" }]}
        >
          <Input onChange={(e) => setID(e.target.value)} />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
      {/* <img
        src="https://media.tenor.com/images/752063d293a04a2ce7ac64b8f983e4d2/tenor.gif"
        alt=""
        style={{ marginLeft: "20%" }}
      /> */}
    </div>
  );
};

export default MyForm;
