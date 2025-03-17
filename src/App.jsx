import { Button } from "@/components/ui/button"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

import { Input } from "@/components/ui/input"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

function App() {
  const number = [{id:1}, {id:2}, {id:3}, {id:4}, {id:5}, {id:6}]
  return (
    <>
      <nav className='bg-blue-700 flex justify-between items-center px-20 py-4'>
        <h1 className="text-white font-bold text-xl">QRENT</h1>

        <div className="auth space-x-4">
          <Button className="px-6 py-2 rounded-md">
            Daftar
          </Button>

          <Button variant="outline" className="px-6 py-2 rounded-md">
            Masuk
          </Button>
        </div>
      </nav>

      <div className="breadcrumb bg-blue-200 py-1 px-20">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Rental Mobil</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <section className="hero relative text-center p-48">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('./assets/car.webp')",
            backgroundPosition: 'center',
            backgroundSize: 'cover',
          }}
        />
        <div className="absolute inset-0 bg-black opacity-50" /> {/* Overlay to dim the background */}
        
        <div className="content z-10 relative">
          <h1 className="text-white font-semibold text-xl">Sewa Mobil Mudah & Terjangkau untuk Perjalanan Anda!</h1>
          <p className="text-white">sewa sekarang!</p>
          <div className="search px-48 mt-10 flex space-x-5">
            <Input placeholder="Cari lokasi anda" className="bg-white"/>
            <Button>Cari</Button>
          </div>
        </div>
      </section>

      <div className="trusted bg-blue-700 px-20 py-5">
        <h1 className="text-white font-semibold text-xl">500+ Trusted Supplier : </h1>
      </div>

      <section className="maincontent space-y-20 py-20">
        <div className="information px-20">
          <div className="aboutus text-center space-y-5 mb-20">
            <div className="title flex gap-2 justify-center">
              <h1 className="text-3xl font-bold">Tentang </h1>
              <h1 className="text-blue-700 text-3xl font-bold"> Kami</h1>
            </div>
            <p className="text-lg">
              Kami adalah layanan rental mobil terpercaya yang hadir untuk memenuhi kebutuhan transportasi Anda dengan mudah, cepat, dan aman. Dengan berbagai pilihan kendaraan berkualitas, kami siap menemani perjalanan Anda, baik untuk keperluan bisnis, liburan, atau kebutuhan harian.
            </p>
          </div>

          <div className="whyus space-y-5">
            <div className="title flex gap-2 justify-center">
              <h1 className="text-3xl font-bold">Kenapa</h1>
              <h1 className="text-blue-700 text-3xl font-bold">Kami</h1>
            </div>

            <div className="card grid grid-cols-3 gap-5">
            <Card>
              <CardHeader>
                <img src="/assets/car.webp" alt="" />
                <CardTitle className="text-center text-xl">Harga Transparan</CardTitle>
                <CardDescription className="text-center">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quaerat, maiores.</CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <img src="/assets/car.webp" alt="" />
                <CardTitle className="text-center text-xl">Mobil Terawat</CardTitle>
                <CardDescription className="text-center">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quaerat, maiores.</CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <img src="/assets/car.webp" alt="" />
                <CardTitle className="text-center text-xl">Customer service 24/7</CardTitle>
                <CardDescription className="text-center">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quaerat, maiores.</CardDescription>
              </CardHeader>
            </Card>
            </div>
          </div>
        </div>

        <div className="tawaran px-20">
          <div className="title flex gap-2 justify-center space-y-5">
            <h1 className="text-3xl font-bold">Tawaran sewa mobil</h1>
            <h1 className="text-blue-700 text-3xl font-bold">Paling populer</h1>
          </div>
        <div className="card grid grid-cols-3 gap-5">
          {
            number.map(()=>(
              <Card>
              <CardHeader>
                <CardTitle className="text-xl">Toyota Avanza</CardTitle>
                <CardDescription>Best for family trips</CardDescription>
                <CardDescription>on Jakarta</CardDescription>
              </CardHeader>
              <CardContent>
                <img src="/assets/car.webp" alt="" />
                <div className="carinfo grid grid-cols-4">
                  <div className="people">
                    6
                  </div>
                  <div className="door">
                    5
                  </div>
                  <div className="ac">
                    AC
                  </div>
                  <div className="gear">
                    Manual
                  </div>
                </div>
                <p>Rp. 200,000 / day</p>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Book</Button>
              </CardFooter>
            </Card>
            ))
          }
            </div>
        </div>
      </section>

      <section className="footer bg-blue-700 px-20 py-10">
        <div className="title flex gap-2 justify-center space-y-5">
          <h1 className="text-3xl font-bold text-white">Kata</h1>
          <h1 className="text-yellow-500 text-3xl font-bold">Mereka</h1>
        </div>
        <div className="card grid grid-cols-3 gap-5">
          {
            number.slice(0,3).map(()=>(
              <Card>
                <CardHeader>
                  <CardTitle>Ananda Divana</CardTitle>
                  <CardDescription>Pelayanan terbaik!</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi excepturi architecto libero beatae velit consequuntur qui nesciunt ad neque assumenda?</p>
                </CardContent>
                <CardFooter>
                  <p>5 star</p>
                </CardFooter>
              </Card>
            ))
          }
          </div>
      </section>
    </>
  )
}

export default App
