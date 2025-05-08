import React, { useContext, useState } from 'react'
import { categoryItem } from '../assets/assets'
import { MenuContext } from '../context/MenuContext'


const Menu = () => {

  const { products } = useContext(MenuContext)
  const [category, setCategory] = useState("All")
  return (
    <div className='px-4 py-8 max-w-6xl mx-auto'>
      {/* secion header */}
      <div className='text-center mb-8'>
        <h1 className='text-4xl front-bold text-gray-800'>Discover Our Menu</h1>
      </div>
      {/* category  button selection  */}
      <div className='text-center mb-8'>
        <h2 className='text-2xl font-medium mb-4 text-gray-700'>Explore Our Catgeories</h2>
        <ul className='flex flex-wrap justify-center gap-4'>
          {
            categoryItem.map((item, index) => (
              <li key={index} onClick={() => setCategory((prev) => prev === item.category_title ? "All" : item.category_title)}
                className={'cursor-pointer px-6 py-2 rounded-full font-medium text-sm transition-all duration-300 ' + (category === item.category_title ? 'bg-gray-800 text-white' : 'bg-gray-200 text-gray-800 hover:bg-gray-300')}>
                {item.category_title}
              </li>
            ))
          }
        </ul>
      </div>
      {/* Menu Display */}
      <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
        {
          products.length > 0 ? (
            products
              .filter((product) => category === "All" || category === product.category).map((product,index) => (
                <div key={index} className='flex items-center gap-6 p-4 border border-gray-100 rounded-xl shadow-sm transition hover:shadow-md'>
                  <img  src={`http://localhost:4000/menu_images/${product.Image}`} alt={product.name} className='w-30 h-30 object-cover rounded-full' />
                  <div className='flex-1'>
                    <div className='flex justify-between items-center'>
                      <h3 className='text-lg font-semibold text-gray-800'>{product.name}</h3>
                      <span className='text-lg font-semibold text-amber-600 relative ml-4'>
                        <span className="before:content=[''] before:absolute before:border-b border-dotted before:border-gray-400 before:left-12 before:top-1/2 before:transform before:translate-y-1/2"></span>
                        ${product.price}
                      </span>
                    </div>
                    <p className='text-sm text-gray-500 mt-1'>lorem ipsum dolor sit amet</p>
                  </div>
                </div>
              ))
          ) : (
            <p className='text-sm col-span-2 text-gray-500'>No products available</p>
          )
        }
      </div>
    </div>
  )
}

export default Menu
