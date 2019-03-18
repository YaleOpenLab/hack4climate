library(xtable)
com <- read.csv("commitments_430pm.csv", as.is = TRUE)


com$name <- com$US_city_com.name
new$name <- data.frame(com$name)
new$des <- c(com$US_city_com.action_description)

un$name <- unique(com$name)

undes <- rep(NA, nrow(un))
for(i in 1:nrow(un)){
  city <- as.character(un[i, "name"][1])
  
  city_data <- new[new$name == city,]
  des <- ""
  for(j in 1:nrow(city_data)){
    des <- paste(des, city_data[j,"des"], sep = ". ")
  }
  undes[i] <- des
}

un$des <- undes

x <- read.csv("data_530pm.csv", as.is = T)
data$fs <- paste(x$jcity, x$State.Code, sep = ", ")
data$description <- rep(NA, nrow(data))
for(i in 1:nrow(un)){
  for(j in 1:nrow(data)){
    if(data$fs[j] == un$name[i]){
      data$description[j] <- un$des[i]
    }
  }
}

write.csv(data, "finaldata.csv")

