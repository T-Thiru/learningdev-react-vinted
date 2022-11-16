import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const PublishOffer = ({ token }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [brand, setBrand] = useState("");
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const [condition, setCondition] = useState("");
  const [city, setCity] = useState("");
  const [price, setPrice] = useState("");
  const [offerPics, setOfferPic] = useState([]);
  const [errorSignIn, setErrorSignIn] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("condition", condition);
      formData.append("city", city);
      formData.append("brand", brand);
      formData.append("size", size);
      formData.append("color", color);
      // formData.append(`picture`, offerPics[0]);
      // console.log(Object.values(offerPics));
      const picsTab = Object.values(offerPics);
      if (picsTab) {
        for (let i = 0; i < picsTab.length; i++) {
          // pics.push(picture.files[i]);
          //   console.log(picsTab[i]);
          formData.append(`picture${[i]}`, picsTab[i]);
        }
      }

      const publish = await axios.post(
        "https://vinted--difficult-club--56xblq4s6sr6.code.run/offer/publish",
        formData,
        {
          headers: {
            authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (publish) {
        console.log(publish);
        navigate("/");
        setErrorSignIn("");
      }
    } catch (error) {
      console.log(error.message);
      console.log(error.response.status);
      console.log(error.response.data);
      if (error.response.status === 400)
        setErrorSignIn("Veuillez remplire tous les champs");
      if (error.response.status === 409)
        setErrorSignIn("Cet adresse mail existe déjà");
    }
  };

  return (
    <div className="wrapper container-Publish">
      <div className="form-publish">
        <Form action="submit" onSubmit={handleSubmit}>
          <Form.Group className="m-1">
            <Form.Label>Selection vos photos</Form.Label>
            <Form.Control
              type="file"
              multiple
              placeholder="photos"
              onChange={(e) => {
                // const newTab = [...offerPics];
                // newTab.push(e.target.files);
                setOfferPic(e.target.files);
              }}
            />
          </Form.Group>
          <Form.Group className="m-1">
            <Form.Label>Titre</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ex:chemise/chaussure"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            />
          </Form.Group>
          <Form.Group className="m-1">
            <Form.Label>Descriptions</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Decris ton article"
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
              }}
            />
          </Form.Group>
          <Form.Group className="m-1">
            <Form.Label>Marque</Form.Label>
            <Form.Control
              type="text"
              placeholder="Marque"
              value={brand}
              onChange={(e) => {
                setBrand(e.target.value);
              }}
            />
          </Form.Group>
          <Form.Group className="m-1">
            <Form.Label>Taille</Form.Label>
            <Form.Control
              type="text"
              placeholder="Taille"
              value={size}
              onChange={(e) => {
                setSize(e.target.value);
              }}
            />
          </Form.Group>
          <Form.Group className="m-1">
            <Form.Label>Couleur</Form.Label>
            <Form.Control
              type="text"
              placeholder="Couleur"
              value={color}
              onChange={(e) => {
                setColor(e.target.value);
              }}
            />
          </Form.Group>
          <Form.Group className="m-1">
            <Form.Label>Etat</Form.Label>
            <Form.Control
              type="text"
              placeholder="Etat"
              value={condition}
              onChange={(e) => {
                setCondition(e.target.value);
              }}
            />
          </Form.Group>
          <Form.Group className="m-1">
            <Form.Label>Lieu</Form.Label>
            <Form.Control
              type="text"
              placeholder="Lieu"
              value={city}
              onChange={(e) => {
                setCity(e.target.value);
              }}
            />
          </Form.Group>
          <Form.Group className="m-1">
            <Form.Label>Prix</Form.Label>
            <Form.Control
              type="number"
              placeholder="Prix"
              value={price}
              onChange={(e) => {
                setPrice(e.target.value);
              }}
            />
          </Form.Group>
          <Button
            variant="info w-100 mt-3"
            style={{ color: "white" }}
            type="submit"
          >
            Publier
          </Button>
          <p style={{ color: "red" }}>{errorSignIn}</p>
        </Form>
      </div>
    </div>
  );
};

export default PublishOffer;
