import axios from "axios";
import { useEffect, useRef, useState } from "react";
import Modal from "react-modal";
import { Link } from "react-router-dom";

interface MapProps {
  basePos: Pos; // 초기 위치(매물 좌표 or 사용자의 위치)
  flag: boolean; // 검색 페이지 일 경우 false, 상세 페이지 일 경우 true
}

interface MarkerData {
  productId: number;
  lat: number;
  lng: number;
  title: number;
  src: string;
}

interface SubMarkerData {
  category: string;
  src: string;
  type: string;
}

interface Pos {
  lat: number;
  lng: number;
}

Modal.setAppElement("#root");

const SearchMap: React.FC<MapProps> = ({ basePos, flag }) => {
  const mapElement = useRef<HTMLDivElement>(null);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [selectedMarkerData, setSelectedMarkerData] = useState<MarkerData>();
  const [subModalIsOpen, setSubModalIsOpen] = useState(false);
  const [selectedSubModalData, setSelectedSubModalData] = useState<string>("");
  const [zoomLevel, setZoomLevel] = useState<number>(13);
  let map: any;
  let markers: naver.maps.Marker[] = [];

  const posRef = useRef<Pos>({ lat: basePos.lat, lng: basePos.lng });

  const markerDatas: Array<MarkerData> = [];
  const subMarkerDatas: Array<SubMarkerData> = [
    {
      category: "편의점",
      src: "https://cdn-icons-png.flaticon.com/512/7561/7561255.png",
      type: "0203046",
    },
    {
      category: "버스정류장",
      src: "https://cdn-icons-png.flaticon.com/512/0/622.png",
      type: "040300201",
    },
    {
      category: "은행",
      src: "https://e7.pngegg.com/pngimages/11/622/png-clipart-computer-icons-bank-money-map-sign-bank-heart-logo.png",
      type: "0203105",
    },
    {
      category: "세탁",
      src: "https://e7.pngegg.com/pngimages/11/622/png-clipart-computer-icons-bank-money-map-sign-bank-heart-logo.png",
      type: "020317401030",
    },
    {
      category: "헬스",
      src: "https://e7.pngegg.com/pngimages/11/622/png-clipart-computer-icons-bank-money-map-sign-bank-heart-logo.png",
      type: "020316403020",
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

  const openModal = (title: number) => {
    setSelectedMarkerData(markerDatas[title]);
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

  function markerRender() {
    function drawMarker() {
      if (!map) return;
      markerDatas.length = 0;
      if (flag) {
        markerDatas.push({
          productId: 0,
          lat: basePos.lat,
          lng: basePos.lng,
          title: 0,
          src: "https://i.namu.wiki/i/qKxcAi_HHGm1iaFqOWf8mrp5xAPjPDTOkxTtNBy5s6qpFXrL16tWL0SiYD0Z57_tLcd_EycaAerp4WtT-rtn9Q.webp",
        });
      } else {
        for (let i = 0; i < 10; i++) {
          markerDatas.push({
            productId: i,
            lat: Math.random() * 2 + 35,
            lng: Math.random() * 3 + 126,
            title: i,
            src: "https://i.namu.wiki/i/qKxcAi_HHGm1iaFqOWf8mrp5xAPjPDTOkxTtNBy5s6qpFXrL16tWL0SiYD0Z57_tLcd_EycaAerp4WtT-rtn9Q.webp",
          });
        }
      }

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
          url: `req/search?service=search&request=search&version=2.0&crs=EPSG:900913&bbox=${bbox}&size=10&page=1&query=${subMarkerDatas[i].category}&type=place&category=${subMarkerDatas[i].type}&format=json&errorformat=json&key=${process.env.REACT_APP_SEARCH_API}`,
        })
          .then((response) => {
            if (response.data.response.result.items) {
              console.log(response.data.response.result.items);
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
                markers.push(marker);
              }
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
          openModal(markerDatas[i].title);
        });
        markers.push(marker);
      }

      if (naver.maps.Event.hasListener(map, "dragend")) return;
      naver.maps.Event.addListener(map, "dragend", redrawing);
    }

    const script = document.createElement("script");
    script.src = `https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${process.env.REACT_APP_CLIENT_ID_NAVER_MAP}&submodules=geocoder`;
    script.async = true;
    script.onload = () => {
      drawMarker();
    };
    document.head.appendChild(script);
    function redrawing() {
      const center = map.getCenter();
      posRef.current = { lat: center.lat(), lng: center.lng() };
      markers.forEach((marker) => marker.setMap(null));
      markers = [];
      drawMarker();
      console.log(posRef.current.lat + " " + posRef.current.lng);
    }
    return () => {
      script.removeEventListener("load", markerRender);
      document.head.removeChild(script);
    };
  }

  function mapRender() {
    function initMap() {
      if (!mapElement.current) return;

      const mapOptions = {
        center: new naver.maps.LatLng(posRef.current.lat, posRef.current.lng),
        zoom: zoomLevel,
      };
      map = new naver.maps.Map(mapElement.current, mapOptions);
      naver.maps.Event.addListener(map, "zoom_changed", (zoom) => {
        setZoomLevel(zoom);
      });

      markerRender();
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
  }

  useEffect(() => {
    mapRender();
  }, []);

  return (
    <div>
      <Modal
        style={customStyles}
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Marker Info Modal"
      >
        <img src={selectedMarkerData?.src} />
        <div>{selectedMarkerData?.title}</div>
        <div>{selectedMarkerData?.lat}</div>
        <div>{selectedMarkerData?.lng}</div>
        <div>
          <Link to={`/products/${selectedMarkerData?.productId}`}>
            <button>자세히 보기</button>
          </Link>
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
