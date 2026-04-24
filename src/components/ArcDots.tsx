import { Colors } from "@/constants/colors";
import { StyleSheet, View } from "react-native";

const SIZE = 220;
const CX = SIZE / 2;
const CY = SIZE / 2;
const RADIUS = 90;
const DOT_SIZE = 35;
const THUMB_SIZE = 42;

const TOTAL_DOTS = 120;
const START_DEG = 120;
const TOTAL_SPAN = 300;

export default function ArcDots({ progress }: { progress: number }) {
	const activeDots = Math.round(progress * (TOTAL_DOTS - 1));

	return (
		<View style={styles.container}>
			{Array.from({ length: TOTAL_DOTS }).map((_, i) => {
				const deg = START_DEG + (i / (TOTAL_DOTS - 1)) * TOTAL_SPAN;
				const rad = (deg * Math.PI) / 180;

				const x = CX + RADIUS * Math.cos(rad);
				const y = CY + RADIUS * Math.sin(rad);

				const isThumb = i === activeDots;
				const isActive = i <= activeDots;

				const size = isThumb ? THUMB_SIZE : DOT_SIZE;

				return (
					<View
						key={i}
						style={[
							styles.dot,
							{
								width: size,
								height: size,
								borderRadius: size / 2,

								left: x - size / 2,
								top: y - size / 2,

								backgroundColor: isThumb
									? "#FFFFFF"
									: isActive
										? "#7357F5"
										: Colors.grey_100,

								borderWidth: isThumb ? 4 : 0,
								borderColor: isThumb ? "#FFFFFF" : "transparent",

								zIndex: isThumb ? 10 : 1,

								shadowColor: "#000",
								shadowOffset: { width: 0, height: 2 },
								shadowOpacity: isThumb ? 0.25 : 0,
								shadowRadius: 6,
							},
						]}
					/>
				);
			})}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		width: SIZE,
		height: SIZE,
		position: "relative",
	},
	dot: {
		position: "absolute",
	},
});