import { ReactNode } from "react";

const ContainWrapper = ({children} :{children: ReactNode}) => {
  return (
    // container
    <div className="relative mx-auto w-full  screen960:px-4 screen1280:w-[1280px] screen1600:w-[1600px] ">
      {/* row  add flex-wrap */}
      <div className="">
        {/* main container  */}
        <div className="p-1">
          {/*  */}
          <div className="px-0 screen600:px-3">
            {/* product container */}
            {/* flex flex-wrap justify-center 
                why does this make image size not scale 
                */}
            <div className="mt-[10px] mb-5 ">
              {/* gird */}
              <div className="grid grid-cols-2 screen600:grid-cols-3 screen960:grid-cols-4 gap-[1px]">
                {children}
              </div>
            </div>

            {/* Filter */}
            {/* <OverlayFilter /> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContainWrapper