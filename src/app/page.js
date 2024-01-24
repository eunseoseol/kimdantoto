"use client";


import React, { useEffect, useState } from 'react';
import { initializeApp } from 'firebase/app';
import { getFirestore, doc, onSnapshot } from 'firebase/firestore';
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged } from 'firebase/auth';
import { loadTossPayments } from "@tosspayments/payment-sdk";

// Firebase 설정 정보
const firebaseConfig = {
  apiKey: "AIzaSyBlLWD-ifPY8So3R2JIQEB_PjRiTUKn7no",
  authDomain: "eunseo-seol-6334e.firebaseapp.com",
  projectId: "eunseo-seol-6334e",
  storageBucket: "eunseo-seol-6334e.appspot.com",
  messagingSenderId: "1042386782911",
  appId: "1:1042386782911:web:7c833a17dc9f505dd3140a",
  measurementId: "G-5RN0P4M3JE"
};

// Firebase 앱 초기화
initializeApp(firebaseConfig);
const auth = getAuth();
const firestore = getFirestore();
const imageStyle = {
  maxWidth: '150px',
  maxHeight: '150px', // 정사각형 비율로 조정
  marginBottom: '20px',
  borderRadius: '10px', // 모서리 둥글게 처리
  transition: 'transform 0.3s ease', // 부드러운 변환 효과
  marginTop: '20px', // 상단에 패딩 추가

};

export default function Page() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isCitizenshipTrue, setIsCitizenshipTrue] = useState(false);

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoggedIn(true);

        // Firestore에서 사용자의 문서 감시
        const userDocRef = doc(firestore, "users", user.email);
        const unsubscribeDoc = onSnapshot(userDocRef, (doc) => {
          const userData = doc.data();
          if (userData && userData.Citizenship === true) {
            setIsCitizenshipTrue(true);
          } else {
            setIsCitizenshipTrue(false);
          }
        });

        return unsubscribeDoc;
      } else {
        setIsLoggedIn(false);
        setIsCitizenshipTrue(false);
      }
    });

    return unsubscribeAuth;
  }, []);

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      // 로그인 성공 처리
      setIsLoggedIn(true);
      console.log('Logged in user:', result.user);
    } catch (error) {
      // 오류 처리
      console.error('Login failed:', error);
    }
  };

  const handleLogout = () => {
    signOut(auth).then(() => {
      // 로그아웃 성공 처리
      setIsLoggedIn(false);
    }).catch((error) => {
      // 오류 처리
      console.error('Logout failed:', error);
    });
  };

  const handleClick = async () => {
    const tossPayments = await loadTossPayments(
      "test_ck_QbgMGZzorznJWP7nelA2rl5E1em4"
    );

    await tossPayments.requestPayment("카드", {
      amount: 100000,
      orderId: Math.random().toString(36).slice(2),
      orderName: "스타크 인더스트리즈 티셔츠",
      successUrl: `${window.location.origin}/api/payments`,
      failUrl: `${window.location.origin}/api/payments/fail`,
    });
  };
  const handleClickhood = async () => {
    const tossPayments = await loadTossPayments(
      "test_ck_QbgMGZzorznJWP7nelA2rl5E1em4"
    );

    await tossPayments.requestPayment("카드", {
      amount: 100000,
      orderId: Math.random().toString(36).slice(2),
      orderName: "스타크 인더스트리즈 후드집업",
      successUrl: `${window.location.origin}/api/payments`,
      failUrl: `${window.location.origin}/api/payments/fail`,
    });
  };
  const handleClicktumblr = async () => {
    const tossPayments = await loadTossPayments(
      "test_ck_QbgMGZzorznJWP7nelA2rl5E1em4"
    );

    await tossPayments.requestPayment("카드", {
      amount: 100000,
      orderId: Math.random().toString(36).slice(2),
      orderName: "스타크 인더스트리즈 텀블러",
      successUrl: `${window.location.origin}/api/payments`,
      failUrl: `${window.location.origin}/api/payments/fail`,
    });
  };

  return (
    <div style={{ position: 'relative', width: '100vw', height: '100vh',overflowY: 'scroll' }}>
      <video autoPlay loop muted playsInline style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', objectFit: 'cover', zIndex: -1 }}>
        <source src="/background.mp4" type="video/mp4" />
      </video>
      {isLoggedIn ? (
        <>
          {isCitizenshipTrue ? (
            <div style={{ position: 'relative', zIndex: 1, width: '100%', paddingTop: '20px', height: 'calc(100vh - 20px)', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <img src="/book.png" alt="Book" style={{ maxWidth: '150px', marginBottom: '20px' }} />
            <h1 style={{ fontSize: '16px', fontWeight: 'bold', color: 'white' }}>
             Stark Industries
            </h1>
            <h1 style={{ fontSize: '16px', fontWeight: 'bold', color: 'white' }}>
            Chaging the world for a better future.
            </h1>

         <footer style={{ textAlign: 'center', marginTop: '0px', padding: '10px', fontSize: '14px', color: 'white' }}>
         <button onClick={handleLogout}>Sign Out</button>

<p>Copyright ⓒ Stark Industries. All Rights Reserved</p>
<p>248-27-01947 | Eunseo Seol | +82 010-3839-7911 | 39-26, Pungyeong-ro 170beon-gil, Gwangsan-gu, Gwangju, Republic of Korea</p>
</footer>

       </div>

          ) : (
            
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              height: '100vh'
            }}>
              <img src="/t-shirts.png" alt="Stark Industries T-Shirt" 
       style={imageStyle}
/>
                <h1 style={{ fontSize: '16px', fontWeight: 'bold', color: 'white' }}>
            스타크 인더스트리즈 티셔츠
           </h1>
         
            <button onClick={handleClick}>구매하기</button>
            <img src="/tumblr.png" alt="Stark Industries T-Shirt" 
       style={imageStyle}
/>
                <h1 style={{ fontSize: '16px', fontWeight: 'bold', color: 'white' }}>
            스타크 인더스트리즈 텀블러
           </h1>
         
            <button onClick={handleClicktumblr}>구매하기</button>

            <img src="/zipup.png" alt="Stark Industries T-Shirt" 
       style={imageStyle}
/>                <h1 style={{ fontSize: '16px', fontWeight: 'bold', color: 'white' }}>
            스타크 인더스트리즈 후드집업
           </h1>
         
            <button onClick={handleClickhood}>구매하기</button>
            </div>

          )}
        </>
      ) : (

<div style={{
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh'
}}>
  <img src="/book.png" alt="Book" style={{ maxWidth: '150px', marginBottom: '20px' }} />
  <h1 style={{ fontSize: '16px', fontWeight: 'bold', color: 'white' }}>
             Stark Industries
            </h1>
            <h1 style={{ fontSize: '16px', fontWeight: 'bold', color: 'white' }}>
            Chaging the world for a better future.
            </h1>
  <button onClick={handleGoogleLogin}>Sign In</button>
  <footer style={{ textAlign: 'center', marginTop: '0px', padding: '10px', fontSize: '14px', color: 'white' }}>

<p>Copyright ⓒ Stark Industries. All Rights Reserved</p>
<p>248-27-01947 | Eunseo Seol | +82 010-3839-7911 | 39-26, Pungyeong-ro 170beon-gil, Gwangsan-gu, Gwangju, Republic of Korea</p>
</footer>
</div>

      )}
          
    </div>
  );
}
