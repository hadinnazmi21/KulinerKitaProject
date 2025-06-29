import { Link } from "react-router-dom";

export default function ArtikelCard({
  id,
  image_url,
  title,
  excerpt,
  kategori,
  tags = [],
}) {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"> 
      
      <img
        src={image_url}
        alt={title}
        className="w-full h-48 sm:h-56 object-cover object-center" 
      />
      <div className="p-4 sm:p-5"> 
      
        <span className="inline-block bg-green-100 text-green-800 text-xs font-semibold px-2 py-1 rounded-full mb-2">
          {kategori}
        </span>
  
        <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2 leading-tight"> 
         
          <Link to={`/artikel/${id}`} className="hover:text-green-600 transition-colors">
            {title}
          </Link>
        </h3>
       
        <p className="text-sm sm:text-base text-gray-600 mt-1 mb-3 line-clamp-3"> 
          {excerpt}
        </p>

      
        <div className="mt-2 flex flex-wrap gap-2">
          {tags.map((tag, i) => (
            <span
              key={i}
              className="bg-gray-200 text-gray-700 text-xs px-2 py-1 rounded-full"
            >
              #{tag}
            </span>
          ))}
        </div>
        
        <Link
          to={`/artikel/${id}`}
          className="block mt-4 text-center bg-green-500 text-white py-2.5 rounded-lg hover:bg-green-600 transition-colors" 
        >
          Baca Selengkapnya
        </Link>
      </div>
    </div>
  );
}