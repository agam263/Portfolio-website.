from PIL import Image

def remove_white_bg(input_path, output_path, tolerance=230):
    img = Image.open(input_path).convert("RGBA")
    data = img.getdata()
    new_data = []
    
    for item in data:
        # Check if the pixel is close to white
        if item[0] > tolerance and item[1] > tolerance and item[2] > tolerance:
            # Change all white (also shades of whites) to transparent
            new_data.append((255, 255, 255, 0))
        else:
            new_data.append(item)
            
    img.putdata(new_data)
    img.save(output_path, "PNG")

remove_white_bg("/Users/agamkundu/.gemini/antigravity/brain/28b80b06-f6fb-4a1b-a1df-5cbae90e1c83/spaceman_rope_1777126105041.png", "/Users/agamkundu/protfilio/public/spaceman_rope.png")
