import axios from "axios";
import { useEffect, useRef, useState } from "react";
import Modal from "react-modal";

interface MarkerData {
  lat: number;
  lng: number;
  info: number;
}

interface subMarkerData {
  category: string;
  src: string;
}

Modal.setAppElement("#root");

const SearchMap: React.FC = () => {
  const mapElement = useRef<HTMLDivElement>(null);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [selectedMarkerData, setSelectedMarkerData] = useState<MarkerData>();

  const [subModalIsOpen, setSubModalIsOpen] = useState(false);
  const [selectedSubModalData, setSelectedSubModalData] = useState<string>("");

  const posRef = useRef({ lat: 37.5666103, lng: 126.9783882 });
  const markerDatas: Array<MarkerData> = [];
  const subMarkerDatas: Array<subMarkerData> = [
    {
      category: "편의점",
      src: "https://cdn-icons-png.flaticon.com/512/7561/7561255.png",
    },
    {
      category: "버스정류장",
      src: "https://cdn-icons-png.flaticon.com/512/0/622.png",
    },
    {
      category: "은행",
      src: "https://e7.pngegg.com/pngimages/11/622/png-clipart-computer-icons-bank-money-map-sign-bank-heart-logo.png",
    },
  ];

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      width: "80%",
      maxWidth: "600px",
    },
  };
  const customStyles2 = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      width: "80%",
      maxWidth: "600px",
    },
  };

  const openModal = (info: number) => {
    setSelectedMarkerData(markerDatas[info]);
    setIsOpen(true);
  };
  const closeModal = () => {
    setSelectedMarkerData(undefined);
    setIsOpen(false);
  };

  const openSubModal = (data: string) => {
    setSelectedSubModalData(data);
    setSubModalIsOpen(true);
  };

  const closeSubModal = () => {
    setSelectedSubModalData("");
    setSubModalIsOpen(false);
  };

  function positionInit() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          posRef.current.lat = position.coords.latitude;
          posRef.current.lng = position.coords.longitude;
        },
        () => {
          console.log("error occured");
        }
      );
    }
  }

  function toEPSG3857(lat: number, lng: number): { x: number; y: number } {
    const R = 20037508.34; // 지구의 반지름 (미터 단위)

    const x = (lng * R) / 180;
    const y = (Math.log(Math.tan(((90 + lat) * Math.PI) / 360)) * R) / Math.PI;

    return { x, y };
  }

  function fromEPSG3857(x: number, y: number): { lat: number; lng: number } {
    const R = 20037508.34; // 지구의 반지름 (미터 단위)

    const lng = (x * 180) / R;
    const lat =
      (2 * Math.atan(Math.exp((y / R) * Math.PI)) - Math.PI / 2) *
      (180 / Math.PI);

    return { lat, lng };
  }

  positionInit();

  useEffect(() => {
    function initMap() {
      if (!mapElement.current) return;

      const mapOptions = {
        center: new naver.maps.LatLng(posRef.current.lat, posRef.current.lng),
        zoom: 10,
      };

      const map = new naver.maps.Map(mapElement.current, mapOptions);

      for (let i = 1; i < 10; i++) {
        markerDatas.push({
          lat: Math.random() * 2 + 35,
          lng: Math.random() * 3 + 126,
          info: i,
        });
      }

      markerDatas.push({
        lat: posRef.current.lat,
        lng: posRef.current.lng,
        info: 10,
      });

      const markers = [];

      const southWest = toEPSG3857(
        posRef.current.lat - 0.01,
        posRef.current.lng - 0.01
      );
      const northEast = toEPSG3857(
        posRef.current.lat + 0.01,
        posRef.current.lng + 0.01
      );

      const bbox = `${southWest.x},${southWest.y},${northEast.x},${northEast.y}`;
      for (let i = 0; i < subMarkerDatas.length; i++) {
        axios({
          method: "GET",
          url: `req/search?service=search&request=search&version=2.0&crs=EPSG:900913&bbox=${bbox}&size=10&page=1&query=${subMarkerDatas[i].category}&type=place&format=json&errorformat=json&key=${process.env.REACT_APP_SEARCH_API}`,
        })
          .then((response) => {
            for (
              let j = 0;
              j < response.data.response.result.items.length;
              j++
            ) {
              const result = fromEPSG3857(
                response.data.response.result.items[j].point.x,
                response.data.response.result.items[j].point.y
              );
              const marker = new naver.maps.Marker({
                position: new naver.maps.LatLng(result.lat, result.lng),
                map: map,
                icon: {
                  content: `
                    <img 
                      src=${subMarkerDatas[i].src}
                      alt="${subMarkerDatas[i].category}" 
                      style="
                        margin: 0; 
                        padding: 0; 
                        border: 0; 
                        display: block; 
                        max-width: none; 
                        max-height: none; 
                        -webkit-user-select: none; 
                        position: absolute; 
                        width: 50px; 
                        height: 30px; 
                        left: 0; 
                        top: 0;
                      "
                    />
                  `,
                  size: new naver.maps.Size(30, 20),
                  anchor: new naver.maps.Point(11, 35),
                },
              });
              naver.maps.Event.addListener(marker, "click", () => {
                openSubModal(response.data.response.result.items[j].title);
              });
            }
          })
          .catch((error) => console.log("전송 실패", error));
      }

      for (let i = 0; i < markerDatas.length; i++) {
        const data = markerDatas[i];
        const marker = new naver.maps.Marker({
          position: new naver.maps.LatLng(data.lat, data.lng),
          map: map,
        });
        naver.maps.Event.addListener(marker, "click", () => {
          openModal(markerDatas[i].info);
        });

        markers.push(marker);
      }
      // naver.maps.Event.addListener(map, "dragend", () => {
      //   const center = map.getCenter();
      //   posRef.current.lat = center.y;
      //   posRef.current.lng = center.x;
      //   console.log(posRef.current.lat + " " + posRef.current.lng);
      // });
    }

    const script = document.createElement("script");
    script.src = `https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${process.env.REACT_APP_CLIENT_ID_NAVER_MAP}&submodules=geocoder`;
    script.async = true;
    script.onload = () => {
      initMap();
    };
    document.head.appendChild(script);

    return () => {
      script.removeEventListener("load", initMap);
      document.head.removeChild(script);
    };
  }, [posRef.current]);

  return (
    <div>
      <Modal
        style={customStyles}
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Marker Info Modal"
      >
        <div>{selectedMarkerData?.info}</div>
        <div>{selectedMarkerData?.lat}</div>
        <div>{selectedMarkerData?.lng}</div>
        <div>
          <button>a</button>
          <button>b</button>
        </div>
      </Modal>
      <Modal
        style={customStyles2}
        isOpen={subModalIsOpen}
        onRequestClose={closeSubModal}
      >
        {selectedSubModalData}
      </Modal>
      <div ref={mapElement} style={{ width: "100%", height: "100vh" }} />
    </div>
  );
};

export default SearchMap;
