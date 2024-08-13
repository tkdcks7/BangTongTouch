import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import useUserStore from "../../store/userStore";
import axios from "axios";
import authAxios from "../../utils/authAxios";

// 컴포넌트
import ImgCarousel from "../molecules/ImgCarousel";
import Devider from "../atoms/Devider";
import ProductProfile from "../molecules/ProductProfile";
import ProductOptions from "../molecules/ProductOptions";
import ProductAdditionalOptions from "../molecules/ProductAdditionalOptions";
import LocationAround from "../molecules/LocationAround";
import {Button, Card, Carousel, Col, ConfigProvider, Modal, Row} from "antd";

// 이미지 소스
import defaltHomeImg from "../../assets/defaulthome.png";
import {
    HeartOutlined,
    HeartFilled,
    DeleteOutlined,
    WechatOutlined,
} from "@ant-design/icons";
import {error} from "console";

const ProductDetail: React.FC = () => {
    // 기본값 선언
    const tempObj = {
        productReturnDto: {
            productId: 1,
            productType: "ONEROOM",
            regionReturnDto: {
                regionId: "1111010900",
                regionSido: "서울특별시",
                regionGugun: "종로구",
                regionDong: "누상동",
            },
            productAddress: "147-51",
            productDeposit: 10,
            productRent: 2000,
            productMaintenance: 5,
            productMaintenanceInfo: "수도세 포함, 전기세 미포함",
            productIsRentSupportable: true,
            productIsFurnitureSupportable: true,
            productSquare: 44.55,
            productRoom: 2,
            productOption: 84,
            productAdditionalOption: [],
            productIsBanned: false,
            productIsDeleted: false,
            productPostDate: "2024-07-19 04:01:15.256",
            productStartDate: "2024-08-01",
            productEndDate: "2024-12-30",
            productAdditionalDetail: "",
            mediaList: [""],
        },
        profileDto: {
            id: 13,
            userEmail: "test@naver.com",
            profileImage: "",
            nickname: "매콤한 호랑이143",
            IsBanned: false,
        },
    };
    let {id}: any = useParams(); // 상품 번호
    const navigate = useNavigate();
    const userId: number = useUserStore().id;

    // 신고 모달 상태관리
    const [isReportModalOpen, setIsReportModalOpen] = useState<boolean>(false);

    // 로딩과 에러를 처리하는 state
    const [loading, setLoading] = useState(true);
    const [connectionFailed, setConnectionFailed] = useState(false);
    const [isInterest, setIsInterest] = useState(false);

    // state와 초기값 선언. 나중에 null, 0 혹은 빈 문자열로 바꿀거임.
    const [productInfo, setProductInfo] = useState(tempObj);

    // 글쓴이가 나인지 확인
    const [isMe, setIsMe] = useState<boolean>();

    // 1:1 채팅 아이콘 hover 처리
    const [hover, setHover] = useState<boolean>(false);

    const [dark, setDark] = useState(true);

    // 백엔드에서 상세 페이지 정보 받아오기
    useEffect(() => {
        const fetchData = async () => {
            try {
                console.log("매물 상세정보 받아오는 중!");
                const response = await authAxios({
                    method: "GET",
                    url: `${process.env.REACT_APP_BACKEND_URL}/products/${id}`,
                });
                setProductInfo(response.data.data);
                console.log(response);
                setIsMe(userId === response.data.data.profileDto.userId); // 유저 Id
                // 관심 매물 등록이 돼있는지 조회 후, 그렇다면 관심 상태를 true로
                axios({
                    method: "GET",
                    url: `${process.env.REACT_APP_BACKEND_URL}/interests/${userId}`,
                })
                    .then((response) => {
                        console.log(response);
                        if (
                            response.data.data.product &&
                            id in response.data.data.product
                        ) {
                            setIsInterest(true);
                        } else {
                            setIsInterest(false);
                        }
                    })
                    .catch((err) => console.log("에러남"));
            } catch (err) {
                console.log(err);
                setConnectionFailed(true);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [id]);

    // 수정 페이지(작성 페이지에서 기본값이 다 설정된 페이지?)로 이동
    // Dto 때문에 userId를 비교하는 로직을 작성 못함.
    // const handleToUpdate = (): void => {
    //   if (productInfo.userId === userId) {
    //     navigate(`/products/update/${id}`)
    //   }
    // }

    // 매물 게시글 삭제 함수
    const handleDelete = (): void => {
        if (productInfo.profileDto.id === userId) {
            authAxios({
                method: "DELETE",
                url: `${process.env.REACT_APP_BACKEND_URL}/products/delete/${id}`,
            })
                .then((response) => {
                    console.log(response);
                    navigate("/product"); // 삭제 후 페이지 이동
                })
                .catch((err) => console.log(err));
        }
    };

    // 관심 매물 등록(좋아요). 관심매물 좋아요 상태도 같이 보내줄 것.
    const handleInterestBtn = (): void => {
        let method: string = "POST";
        let url: string = `${process.env.REACT_APP_BACKEND_URL}/interests/add`;
        let data: any = {userId, productId: id};
        if (isInterest) {
            method = "DELETE";
            url = `${process.env.REACT_APP_BACKEND_URL}/interest/delete/${userId}/${id}`;
            data = {};
        }
        authAxios({method, url, data})
            .then((response) => {
                console.log("관심 매물 등록/취소됐음!");
                setIsInterest(() => !isInterest); // 관심 매물 true/false 상태를 반전
            })
            .catch((err) => console.log(err));
    };

    // 채팅방 생성
    const makeChatRoom = () => {
        authAxios({
            method: "POST",
            url: `${process.env.REACT_APP_BACKEND_URL}/chatrooms/save`,
            data: {
                title: "끼얏호우",
                maker: productInfo.profileDto.id,
                participant: userId,
                productId: productInfo.productReturnDto.productId,
            },
        })
            .then((response) => {
                console.log(response.data.data);
                navigate(`/chats/${response.data.data}`);
            })
            .catch((response) => {
                console.log(response);
            });
    };

    // 일자를 파싱하는 함수
    const timeParser = (time: string): number[] => {
        if (!time) {
            return [0, 0, 0];
        }
        return time.split("-").map((el) => Number(el));
    };

    // modal ok 버튼 핸들러
    const handleModalOk = () => {
        setIsReportModalOpen(false);
    };

    // modal cancel 버튼 핸들러
    const handleModalCancel = () => {
        setIsReportModalOpen(false);
    };

    // ant design 글로벌 디자인 토큰
    const theme = {
        token: {
            colorBgTextHover: "#E9FFE7",
            colorPrimary: "#129B07",
            colorPrimaryBorder: "#129B07",
            defaultHoverBg: "#129B07",
        },
    };

    // 계약일, 계약종료일을 연월일로 반환
    const [startYear, startMonth, startDay] = timeParser(
        productInfo.productReturnDto.productStartDate
    );
    const [endYear, endMonth, endDay] = timeParser(
        productInfo.productReturnDto.productEndDate
    );

    const remainMonth = (endYear - startYear) * 12 + (endMonth - startMonth);

    // 비트마스킹된 기본옵션들 뽑아오기
    const options: number = productInfo.productReturnDto.productOption || 0;

    // 문자열 리스트로 들어오는 추가옵션 받아오기
    const additionalOption: string[] =
        productInfo.productReturnDto.productAdditionalOption || [];

    if (loading) return <div>Loading...</div>;
    // if (connectionFailed) return <div>데이터를 불러오는 데 실패했습니다.</div>;

    const homeTypeNameTable: any = {
        ONEROOM: "원룸",
        TWOROOM: "투룸+",
        OFFICE: "오피스텔",
        VILLA: "빌라",
        APARTMENT: "아파트",
    };

    // 1:1 채팅 버튼 스타일
    const oneToOneButtonStyle = {
        backgroundColor: hover ? "#facc15" : "#fef08a",
        borderColor: hover ? "#facc15" : "",
        color: hover ? "#ffffff" : "",
    };

    return (
        <>
            <div className="hidden md:block w-4/5 mx-auto">
                <div className="flex">
                    <div>
                        <Card style={{width: 280}} className="mb-5 shadow-lg">
                            <Carousel arrows>
                                {productInfo.productReturnDto.mediaList &&
                                productInfo.productReturnDto.mediaList[0] ? (
                                    productInfo.productReturnDto.mediaList.map((src: any) => (
                                        <img
                                            src={`https://bangtong-bucket.s3.ap-northeast-2.amazonaws.com/${src.mediaPath}`}
                                            alt="집 이미지"
                                            className="h-40"
                                        />
                                    ))
                                ) : (
                                    <img src={defaltHomeImg}/>
                                )}
                            </Carousel>
                            <h2 className="text-xl font-bold mt-5 ">
                                보증금 {productInfo.productReturnDto.productDeposit}
                                &nbsp;/&nbsp;월세&nbsp;
                                {productInfo.productReturnDto.productRent}
                            </h2>
                            {/* 지역 표시 */}
                            <p className="text-gray-400 mt-4">
                                {productInfo.productReturnDto.regionReturnDto.regionSido}{" "}
                                {productInfo.productReturnDto.regionReturnDto.regionGugun}{" "}
                                {productInfo.productReturnDto.regionReturnDto.regionDong}{" "}
                                {productInfo.productReturnDto.productAddress}
                            </p>
                            <div className="flex justify-between mt-4">
                                <div className="flex">
                                    {productInfo.productReturnDto.productIsRentSupportable ? (
                                        <p className="w-auto p-2 font-bold text-black bg-lime-500 rounded-full text-center text-nowrap me-3">
                                            월세지원
                                        </p>
                                    ) : (
                                        ""
                                    )}
                                    {productInfo.productReturnDto.productIsRentSupportable ? (
                                        <p className="w-auto p-2 font-bold text-black bg-yellow-300 rounded-full text-center text-nowrap">
                                            가구도 승계
                                        </p>
                                    ) : (
                                        ""
                                    )}
                                </div>
                                <button onClick={handleInterestBtn} className="text-xl">
                                    {isInterest ? <HeartFilled/> : <HeartOutlined/>}
                                </button>
                            </div>
                        </Card>
                        <Card style={{width: 280}} className="mb-5 shadow-lg">
                            <LocationAround/>
                        </Card>
                    </div>
                    <div className="ms-10 w-full">
                        <div>
                            <ImgCarousel
                                imgSrcArray={productInfo.productReturnDto.mediaList}
                                productId={id}
                                isCanClick={false}
                            />
                        </div>
                        <div className="flex justify-end items-center mt-5 text-2xl font-bold hover:cursor-pointer">
                            <img
                                src={`https://bangtong-bucket.s3.ap-northeast-2.amazonaws.com/${productInfo.profileDto.profileImage}`}
                                alt="프로필 이미지"
                                className="w-10 h-10 me-5 rounded-full"
                            />
                            <p className="me-5">{productInfo.profileDto.nickname}</p>
                            <ConfigProvider theme={theme}>
                                <Button
                                    className={"bg-yellow-200 hover:bg-color-400"}
                                    style={oneToOneButtonStyle}
                                    size="large"
                                    onMouseEnter={() => setHover(true)}
                                    onMouseLeave={() => setHover(false)}
                                    icon={
                                        <WechatOutlined
                                            style={{fontSize: "24px"}}
                                            disabled={true}
                                            type="primary"
                                        />
                                    }
                                    onClick={makeChatRoom}
                                />
                            </ConfigProvider>
                        </div>
                        <div className="p-10 pt-20 mt-20 rounded-2xl border border-slate-200">
                            <Row>
                                <Col span={12} className="text-xl">
                                    <span className="font-bold">관리비 | </span>
                                    {productInfo.productReturnDto.productMaintenance} 원
                                </Col>
                                <Col span={12} className="text-xl">
                                    <span className="font-bold">관리비 포함 | </span>
                                    {productInfo.productReturnDto.productMaintenanceInfo}
                                </Col>
                            </Row>
                            <Row className="mt-10">
                                <Col span={8} className="text-xl">
                                    <span className="font-bold">집 유형 | </span>
                                    {homeTypeNameTable[productInfo.productReturnDto.productType]}
                                </Col>
                                <Col span={8} className="text-xl">
                                    <span className="font-bold">방 개수 | </span>
                                    {productInfo.productReturnDto.productRoom} 개
                                </Col>
                                <Col span={8} className="text-xl">
                                    <span className="font-bold">면적 | </span>
                                    {productInfo.productReturnDto.productSquare} m²
                                </Col>
                            </Row>
                            <Row className="items-center mt-10">
                                <Col span={24} className="text-xl flex items-center">
                                    <span className="font-bold">기본 옵션 | </span>
                                    <ProductOptions options={options} isPc dark/>
                                </Col>
                            </Row>
                            <Row className="mt-10">
                                <Col span={24} className="text-xl">
                                    <span className="font-bold">추가 옵션 | </span>
                                    {productInfo.productReturnDto.productAdditionalOption}
                                </Col>
                            </Row>
                            {isMe ? (
                                <div className="mt-5 text-end">
                                    <button
                                        className="w-12 h-12 bg-red-400 rounded-xl hover:bg-red-300 shadow-lg"
                                        onClick={handleDelete}
                                    >
                                        <DeleteOutlined className="text-lg align-middle"/>
                                    </button>
                                </div>
                            ) : null}
                        </div>
                    </div>
                </div>
            </div>
            <div className="md:hidden">
                <div className="mt-10 w-full md:w-2/5 mx-auto">
                    <ImgCarousel imgSrcArray={productInfo.productReturnDto.mediaList}/>
                    <h2 className="text-2xl font-bold text-center">{`${productInfo.productReturnDto.regionReturnDto.regionSido} ${productInfo.productReturnDto.regionReturnDto.regionGugun} ${productInfo.productReturnDto.regionReturnDto.regionDong}`}</h2>
                    {/* 유저 프로필, 연락하기 */}
                    <ProductProfile
                        userinfo={productInfo.profileDto}
                        productId={productInfo.productReturnDto.productId}
                    />
                    <Devider/>
                    <h2 className="text-2xl font-black">매물 설명 </h2>
                    <p className="mt-2">
                        {productInfo.productReturnDto.productAdditionalDetail
                            
                            ? productInfo.productReturnDto.productAdditionalDetail
                            : "등록된 상세 설명이 없습니다"}
                    </p>
                    {/* 구분선 */}
                    <Devider/>
                    {/* 기본정보 */}
                    <div id="basicInformation">
                        <h2 className="text-2xl font-black">기본정보</h2>
                        <div className="mt-5">
                            <div className="flex justify-between font-bold border-b-2 border-gray mb-2">
                                <p>월세 / 보증금 (만)</p>
                                <p>{`${productInfo.productReturnDto.productDeposit} / ${productInfo.productReturnDto.productRent}`}</p>
                            </div>
                            <div className="flex justify-between font-bold border-b-2 border-gray mb-2">
                                <p>관리비 (만)</p>
                                <p>{`${productInfo.productReturnDto.productMaintenance}`}</p>
                            </div>
                            <div className="flex justify-between font-bold border-b-2 border-gray mb-2">
                                <p>승계 기간 (남은 계약기간)</p>
                                <p>{`${remainMonth}개월`}</p>
                            </div>
                            <div className="flex justify-between font-bold border-b-2 border-gray mb-2">
                                <p>입주 가능일</p>
                                <p>{`${startYear}년 ${startMonth}월 ${startDay}일`}</p>
                            </div>
                            <div className="flex justify-between font-bold border-b-2 border-gray mb-2">
                                <p>계약 종료일</p>
                                <p>{`${endYear}년 ${endMonth}월 ${endDay}일`}</p>
                            </div>
                        </div>
                    </div>
                    {/* 구분선 */}
                    <Devider/>
                    {/* 옵션 */}
                    <ProductOptions options={options} isPc={false} dark/>
                    {/* 구분선 */}
                    <Devider/>
                    {/* 추가옵션 */}
                    <ProductAdditionalOptions
                        additionalOptions={additionalOption as Array<string>}
                    />
                    {/* 구분선 */}
                    <Devider/>
                    <LocationAround/>
                    <div className="h-20"/>
                </div>
                <button onClick={() => setIsReportModalOpen(true)}>
                    신고버튼테스트
                </button>
                <br/>
                <button onClick={handleInterestBtn}>
                    {isInterest ? <HeartFilled/> : <HeartOutlined/>}
                </button>
                <ConfigProvider theme={theme}>
                    <Modal
                        title="지역을 선택해주세요."
                        open={isReportModalOpen}
                        onOk={handleModalOk}
                        onCancel={handleModalCancel}
                    >
                        <div className="p-2 text-center"></div>
                    </Modal>
                </ConfigProvider>
            </div>
        </>
    );
};

export default ProductDetail;
