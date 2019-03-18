
install.packages("ggmap")
install.packages("ggplot2")
install.packages("lazyeval")
install.packages("purrr")
library(lazyeval)
library(ggplot2)
library(ggmap)
qmap(location = "boston university", zoom = 14)
register_google(key = "AIzaSyD8JZoh4alIA-jTAzJPYFR_48Nz5seh-dY")
usa_center = as.numeric(geocode("United States"))
USAMap = ggmap(get_googlemap(center=usa_center, scale=2, zoom=4), extent="normal")
USAMap
ggmap(get_googlemap(center=usa_center, scale=2, zoom=1), extent="normal")
USAMap + 
  geom_point(aes(x=1.3,y=103), data=mv_num_collisions, col="orange", alpha=0.4, size=mv_num_collisions$collisions*circle_scale_amt) +  
  scale_size_continuous(range=range(mv_num_collisions$collisions))
mydata = read.csv("vehicle-accidents.csv")
mydata$State <- as.character(mydata$State)
mydata$MV.Number = as.numeric(mydata$MV.Number)
mydata = mydata[mydata$State != "Alaska", ]
mydata = mydata[mydata$State != "Hawaii", ]
for (i in 1:nrow(mydata)) {
  latlon = geocode(mydata[i,1])
  mydata$lon[i] = as.numeric(latlon[1])
  mydata$lat[i] = as.numeric(latlon[2])
}

mv_num_collisions = data.frame(mydata$MV.Number, mydata$lon, mydata$lat)

colnames(mv_num_collisions) = c('collisions','lon','lat')

usa_center = as.numeric(geocode("Europe"))

USAMap = ggmap(get_googlemap(center=usa_center, scale=2, zoom=4), extent="normal")
USAMap

USAMap + 
  geom_point(data=M, aes(x=lng, y=lat), col=M$value_of_m, alpha=0.4, 
  )

M <- read.csv("M.csv")
commitments <- read.csv("commitments.csv")
contextuals <- read.csv("contextuals.csv")

for(i in 1:nrow(M)){
  for(j in 1:nrow(contextuals)){
    if(M$name[i] == contextuals$right[j]){
      M$lat[i] <- contextuals$lat[j]
      M$lng[i] <- contextuals$lng[j]
    }
  }
}

 install.packages("rworldmap")
library(rworldmap)
newmap <- getMap(resolution = "less")
plot(newmap, xlim = c(-10, 40), ylim = c(52, 58), asp=1)


for(i in 1:nrow(M)){
  if(M$value_of_m[i] <= 0.3){
    M$cat_of_m[i] <- 1
  }
  else if (M$value_of_m[i] <= 0.6){
    M$cat_of_m[i] <- 2
  }
  else if (M$value_of_m[i] <= 0.9){
    M$cat_of_m[i] <- 3
  }
  else if (M$value_of_m[i] <= 1.2){
    M$cat_of_m[i] <- 4
  }
  else if (M$value_of_m[i] <= 1.5){
    M$cat_of_m[i] <- 5
  }
  else {
    M$cat_of_m[i] <- 6
  }
}


points(M$lng, M$lat, col = M$value_of_m, cex = 2)

library(ggmap)
map <- get_map(location = 'Europe', zoom = 4)
mapPoints <- ggmap(map) +
  geom_point(aes(x = lng, y = lat, col=factor(cat_of_m)), size = 4, data = M, alpha = 1)
mapPoints
mapPointsLegend <- mapPoints +
scale_color_manual(values = c("firebrick4", "red", "khaki1", "green4", "green", "turquoise1"), labels = c("Severely Undersachieving", "Moderately Underachieving", "Slightly Underachieving", "Achieved", "Moderately Overachieving", "Highly Overachieving"), name = "Pledge Fulfilment" )
mapPointsLegend

install.packages("stringr")
library(stringr)

for(i in 1:nrow(M)){
 count <- 0
 if(str_detect(M$raw_commitment[i],"production")){
    count <- count + 1
  }
 if(str_detect(M$raw_commitment[i],"consumption")){
   count <- count + 1
 }
 if(str_detect(M$raw_commitment[i],"transport")){
   count <- count + 1
 }
 M$keyterms[i] <- count
}

map2 <- get_map(location = 'Europe', zoom = 4)
mapPoints2 <- ggmap(map2) +
  geom_point(aes(x = lng, y = lat, col=factor(keyterms)), size = 3, data = M, alpha = 1)
mapPoints2
mapPointsLegend2 <- mapPoints2 +
  scale_color_manual(values = c("khaki1", "green4", "green", "turquoise1"), labels = c("0", "1", "2", "3"), name = "Number of Key Terms" )
mapPointsLegend2
