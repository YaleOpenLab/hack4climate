install.packages("ggmap")


if(!requireNamespace("devtools")) install.packages("devtools")
devtools::install_github("dkahle/ggmap")

MyData <- read.csv(file="hack4climate_commitments_070319.csv", header=TRUE, sep=",")
MyDatacontext <- read.csv(file="hack4climate_contextuals_090319.csv", header=TRUE, sep=",")

head(MyData)

MyData$estimated_tonnes_reduced

MyData_reduced <- MyData[which(MyData$estimated_tonnes_reduced != NA),]
MyData_reduced <- MyData[complete.cases(MyData[ ,14:15]),]
MyData_reduced <- MyData_reduced[complete.cases(MyData_reduced[ ,19]),]
MyData_reduced <- MyData_reduced[complete.cases(MyData_reduced[ ,30]),]
MyData_reduced <- MyData_reduced[complete.cases(MyData_reduced[ ,34]),]

MyData_reduced_2 <- MyData_reduced[!duplicated(MyData_reduced$name),]

data1<-(MyData_reduced_2$estimated_tonnes_reduced / MyData_reduced_2$baseline_emissions)

data2<- data_test_3 *(2018 - data_test_2)/(data_test - data_test_2)

data1<- data1[-which(data1 == max(data1))]
data2<- data2[-which(data1 == max(data1))]

which(data1 == max(data1))

plot(data1~data2, xlim = c(0,100))
lm <- lm(data1~data2)
abline(lm)
abline (a = 0, b = 1)

data_test <- MyData_reduced_2$target_year
data_test <- as.numeric(levels(data_test))[data_test]
data_test_2 <- MyData_reduced_2$baseline_year
data_test_2 <- as.numeric(levels(data_test_2))[data_test_2]
data_test
data_test_3 <- MyData_reduced_2$percent_reduction
data_test_3 <- as.numeric(levels(data_test_3))[data_test_3]

con_string <-  paste(MyData_reduced_2$raw_commitment, collapse = ' ')
write.table(con_string, file = "con_string.txt", sep = "\t",
            row.names = FALSE)


as.numeric(levels(data_test))[data_test]

as.numeric(levels(f))[f]

duplicated(MyData_reduced$name)

?duplicated

MyData$estimated_tonnes_reduced != NA



for(i in 1:nrow(MyData)){
  for(j in 1:nrow(MyDatacontext)){
    if(MyData$name[i] == MyDatacontext$right[j]){
      MyData$lat[i] <- MyDatacontext$lat[j]
      MyData$lng[i] <- MyDatacontext$lng[j]
    }
  }
}


install.packages("stringr")
library(stringr)
for(i in 1:nrow(MyData_reduced)){
  if(str_detect(MyData_reduced$raw_commitment[i], "energy")){
    MyData_reduced$binary[i] <- 1
  }
  else{
    MyData_reduced$binary[i] <- 0
  }
}

cleaned_csv <- read.csv(file="Updated-Commitments.csv", header=TRUE, sep=",")

for(i in 1:nrow(cleaned_csv)){
  if(str_detect(cleaned_csv$raw_commitment[i], "energy")){
    cleaned_csv$binary_energy[i] <- 1
  }
  else{
    cleaned_csv$binary_energy[i] <- 0
  }
}

for(i in 1:nrow(cleaned_csv)){
  if(str_detect(cleaned_csv$raw_commitment[i], "renewable")){
    cleaned_csv$binary_renewable[i] <- 1
  }
  else{
    cleaned_csv$binary_renewable[i] <- 0
  }
}

for(i in 1:nrow(cleaned_csv)){
  if(str_detect(cleaned_csv$raw_commitment[i], "consumption")){
    cleaned_csv$binary_consumption[i] <- 1
  }
  else{
    cleaned_csv$binary_consumption[i] <- 0
  }
}

for(i in 1:nrow(cleaned_csv)){
  if(str_detect(cleaned_csv$raw_commitment[i], "production")){
    cleaned_csv$binary_production[i] <- 1
  }
  else{
    cleaned_csv$binary_production[i] <- 0
  }
}

for(i in 1:nrow(cleaned_csv)){
  if(str_detect(cleaned_csv$raw_commitment[i], "emission")){
    cleaned_csv$binary_emission[i] <- 1
  }
  else{
    cleaned_csv$binary_emission[i] <- 0
  }
}

for(i in 1:nrow(cleaned_csv)){
  if(str_detect(cleaned_csv$raw_commitment[i], "transport")){
    cleaned_csv$binary_transport[i] <- 1
  }
  else{
    cleaned_csv$binary_transport[i] <- 0
  }
}

for(i in 1:nrow(cleaned_csv)){
  if(str_detect(cleaned_csv$raw_commitment[i], "waste")){
    cleaned_csv$binary_waste[i] <- 1
  }
  else{
    cleaned_csv$binary_waste[i] <- 0
  }
}

write.csv(cleaned_csv, file = "cleaned_csv.csv")

str_de
final[complete.cases(final[ , 5:6]),]

1+1

read