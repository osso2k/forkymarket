import { useEffect, useState } from "react"
import api from "../api"
import {motion , AnimatePresence } from "motion/react"
import { Link } from "react-router-dom";

interface News {
  id: number;
  headline: string;
  datetime: number;
  summary: string;
  url: string

}
const CryptoNews = () => {
  const [news, setNews] = useState<News[]>([])
  const [startIndex, setStartIndex] = useState(0)


  useEffect(()=>{
    const getNews = async () =>{
        try {
          const response = await api.get("/api/news/general")
          setNews(response.data)
        } catch (error) {
          console.log("Error in getting news...", (error as Error).message);
        }
      }
      getNews()
  },[])
  useEffect(()=>{
    if (news.length <= 2){
      return 
    }
    const inteval = setInterval(()=>{
      setStartIndex(prev => (prev + 2) % news.length)
    }, 7500)

    return () => clearInterval(inteval)
  },[news])
  const visibleNews = [news[startIndex], news[(startIndex + 1) % news.length],].filter(Boolean)
  return (
    <div className="max-h-full flex flex-fit w-full font-sans">
      {news.length > 0 ? <><div className="">
      <AnimatePresence mode="wait">
        <motion.div
          key={startIndex}
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -10, opacity: 0 }}
          transition={{
            duration: 0.7,
            ease: "easeInOut",
          }}
        >
          {visibleNews.map((item) => (
            <div
              key={item.id}
              className="mb-3 rounded-lg p-3"
            >
              <h3 className="font-semibold text-[14px] lg:text-md">{item.headline}</h3>
              <p className="text-xm font-sans">
                {new Date(item.datetime * 1000).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  hour: "numeric",
                  minute: "2-digit"
                })}
              </p>
              <Link className="px-4 py-1 rounded font-bold font-minecraft bg-zinc-600 text-xm" to={item.url} target="_blank">Go</Link>
            </div>
          ))}
        </motion.div>
      </AnimatePresence>
    </div></> : <> <p>No news yet...</p></>}
    </div>
  )
}

export default CryptoNews