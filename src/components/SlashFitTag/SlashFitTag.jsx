export default function SlashFitTag({ content = "Untitled Section" , id}) {
    
    const handleClick = () => {
   
        const element = document.getElementById(id);
        if (element) {
          console.log(element)
          element.scrollIntoView({ behavior: 'smooth' })
        }
       
    }
    return (
      <a href={id && `#${id}`} onClick={() => handleClick()} className="w-fit md:col-span-6 text-xs uppercase text-secondary my-2 hover:text-zinc-500">
        {`/  `}
      
        {<span className="underline">
            {`${content}`} 
        </span>
            
        }
         {`  .`}
        

      </a>
    );
  }