export default function SlashFitTag({ content = "Untitled Section" , id}) {
    return (
      <a href={id && `#${id}`} className="col-span-full md:col-span-6 text-xs uppercase text-secondary my-2 hover:text-zinc-500">
        {`/  `}
      
        {<span className="underline">
            {`${content}`} 
        </span>
            
        }
         {`  .`}
        

      </a>
    );
  }