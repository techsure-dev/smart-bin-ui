import { Flex, Typography } from "antd";
import ArrowIcon from "../../../assets/icons/arrow.svg?react";

const {Text} = Typography

interface CategoryCardProps {
  image: string;
  header: string;
  bgColor?: string;     
  iconColor?: string;   
  textColor?: string;  
}

const CategoryCard = ({
  image,
  header,
  bgColor = "#F0F0F0",
  iconColor = "#000",
  textColor = "#000",
}: CategoryCardProps) => {
  
  return (
    <Flex
      className="flex flex-col items-center p-3"
    >
      {/* Image */}
       <div
        className="flex items-center justify-center mb-2"
        style={{
          width: "174px", 
          height: "160px", 
          overflow: "hidden",
        }}
      >
        <img
          src={image}
          alt={header}
          className="w-full h-full object-contain"
        />
      </div>

      <div className="flex flex-col items-center">
        <ArrowIcon className="h-16 w-8 animate-bounce" fill={iconColor} />
      </div>

      {/* Text */}
      <Flex
        vertical
        className="flex justify-center items-center p-2"
        style={{
          backgroundColor: bgColor,
          width: "175px",
          height: "267px",
          borderRadius: "8px",
          textAlign: "center",
        }}
      >
        <Text className="text-heading-xs font-bold" style={{ color: textColor }}>
          {header}
        </Text>
      </Flex>
    </Flex>
  );
};

export default CategoryCard;
