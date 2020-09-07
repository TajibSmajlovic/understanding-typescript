import axios from "axios";

import TGoogleGeocodingResponse from "./types/TGoogleGeocodingResponse";
import { API_ENDPOINTS } from "./utils/constants";

const form = document.querySelector("form")!;
const addressInput = <HTMLInputElement>document.getElementById("address");

function searchAddressHandler(event: Event) {
  event.preventDefault();

  axios
    .get<TGoogleGeocodingResponse>(
      API_ENDPOINTS.GOOGLE_MAPS_URL(addressInput.value)
    )
    .then((res) => {
      if (res.data.status !== "OK") {
        throw new Error("Error!");
      } else {
        const coordinates = res.data.results[0].geometry.location;
        const map = new google.maps.Map(document.getElementById("map")!, {
          center: coordinates,
          zoom: 16,
        });

        new google.maps.Marker({ position: coordinates, map: map });
      }
    })
    .catch((err) => {
      alert(err);
    });
}

form.addEventListener("submit", searchAddressHandler);
