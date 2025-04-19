import React, { useState } from 'react';
import { useAppContext } from "../context/AppContext"

const About = () => {
    return (
    <section className="about-section p-20 mt-12  bg-gray-100"  id='about'>
    <h1 className='text-3xl text-center md:text-4xl font-semibold mb-12 text-gray-800'>About Us</h1>
        <p className="text-gray-700 leading-relaxed text-center mb-4">
        Platform rental ini didirikan dengan visi untuk merevolusi industri penyewaan kendaraan, menyediakan pengalaman yang seamless dan inovatif melalui teknologi canggih, yang menghubungkan pengguna dengan pilihan mobil berkualitas tinggi, memastikan kenyamanan, fleksibilitas, dan efisiensi dalam setiap perjalanan. Mari apresiasi dan berkenalan dengan developers di balik layar!
        </p>
    <div className="about-developers flex flex-wrap gap-10 justify-center">
  <div className="developer-card bg-white rounded-lg shadow-md p-4 text-center transition-transform transform hover:scale-105 w-full sm:w-1/2 md:w-1/4">
    <img src="https://cdn.inflact.com/media/456661078_1028861481817712_330454279574334140_n.jpg?url=https%3A%2F%2Fscontent.cdninstagram.com%2Fv%2Ft51.2885-19%2F456661078_1028861481817712_330454279574334140_n.jpg%3Fstp%3Ddst-jpg_s320x320_tt6%26_nc_ht%3Dinstagram.fbkk30-1.fna.fbcdn.net%26_nc_cat%3D108%26_nc_oc%3DQ6cZ2QEx_245RSQqt9MJ5Mei6eaLE6TZcBGB00QJvpA9mrp9HffPAX4slAJdxFuBA1OQmacXlA7U5iqPwC-Ty2e0sqk_%26_nc_ohc%3Du6xuOJsoFcsQ7kNvwEXQOK9%26_nc_gid%3Djbi1wvhuzb9rg8YBABI2LA%26edm%3DAOQ1c0wBAAAA%26ccb%3D7-5%26oh%3D00_AfG7IoNle-12BS0vNWMbaeAQahlUCONB2pRvKqEGlC3Kjg%26oe%3D6806F59C%26_nc_sid%3D8b3546&time=1744905600&key=49543fd58a0b2336ed37b29db3b1e64b" alt="Developer 2" className="w-24 h-24 rounded-full object-cover mb-4 mx-auto" />
    <h4 className="text-lg font-semibold">Ananda Divana</h4>
    <h4 className="text-sm text-gray-500">2210511053</h4>
    <h5 className="text-gray-600"><i>Back-end Developer</i></h5>
    <p className="text-gray-600 mt-2 mb-4">
      Hi guys! Semoga website ini bisa bermanfaat ya! Kalau ada umpan balik, bisa reach out kami yaa!
    </p>
    <p><a href="https://github.com/aamonn" className="text-primary hover:underline">Visit GitHub</a></p>
  </div>

  <div className="developer-card bg-white rounded-lg shadow-md p-4 text-center transition-transform transform hover:scale-105 w-full sm:w-1/2 md:w-1/4">
    <img src="https://cdn.inflact.com/media/366447416_175821118850940_7557552444322287563_n.jpg?url=https%3A%2F%2Fscontent.cdninstagram.com%2Fv%2Ft51.2885-19%2F366447416_175821118850940_7557552444322287563_n.jpg%3Fstp%3Ddst-jpg_s320x320_tt6%26_nc_ht%3Dscontent.cdninstagram.com%26_nc_cat%3D100%26_nc_oc%3DQ6cZ2QEZbYj92mTYa2Q7WnT1oJ6cBt5A2YaY5Fv_1GcIcbrzATw69UuyoRE2o74nlAPE_k8%26_nc_ohc%3D5GMqVvCeGjkQ7kNvwGfpS0A%26_nc_gid%3D0gKPWhGYX0MavAPM132bxA%26edm%3DAOQ1c0wBAAAA%26ccb%3D7-5%26oh%3D00_AfEl8dHhfeV5V04P9G73H_zbmNN1bdTaG2zr3GZi3DIWbg%26oe%3D6806E5A1%26_nc_sid%3D8b3546&time=1744905600&key=f3c37f5730671a6ccd88e7eb41e7cd5f" alt="Developer 1" className="w-24 h-24 rounded-full object-cover mb-4 mx-auto" />
    <h4 className="text-lg font-semibold">Daffa Maulana</h4>
    <h4 className="text-sm text-gray-500">2210511063</h4>
    <h5 className="text-gray-600"><i>Front-end Developer</i></h5>
    <p className="text-gray-600 mt-2 mb-4">
      Hallo semuanya! Sebentar lagi gue lulus, and then sedang mencari kesempatan untuk #KaburAjaDulu 👀!
    </p>
    <p><a href="https://github.com/daffmaulana/" className="text-primary hover:underline">Visit GitHub</a></p>
  </div>

  <div className="developer-card bg-white rounded-lg shadow-md p-4 text-center transition-transform transform hover:scale-105 w-full sm:w-1/2 md:w-1/4">
    <img src="https://avatars.githubusercontent.com/u/142960207?v=4" alt="Developer 3" className="w-24 h-24 rounded-full object-cover mb-4 mx-auto" />
    <h4 className="text-lg font-semibold">Diaz Saputra</h4>
    <h4 className="text-sm text-gray-500">2210511087</h4>
    <h5 className="text-gray-600"><i>Back-end Developer</i></h5>
    <p className="text-gray-600 mt-2 mb-4">
      Salam kenal semua! Support terus kegiatan positif kami ya! Kepoin GitHub gua buat projek-projek seru lainnya!.
    </p>
    <p><a href="https://github.com/d1azdn" className="text-primary hover:underline">Visit GitHub</a></p>
  </div>
</div>
        </section>
      );
}

export default About