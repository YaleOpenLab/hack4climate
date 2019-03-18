##Datatthon

setwd("c:/users/Wayne/Downloads")
##View datasets
contextuals<- read.csv('hack4climate_contextuals_090319.csv')
MyData <- read.csv('hack4climate_commitments_070319.csv')
summary(MyData)
summary(commitment)
##View Commitment outcome columns
MyData_reduced <- MyData[complete.cases(MyData[ ,14:15]),]
MyData_reduced <- MyData_reduced[complete.cases(MyData_reduced[ ,19]),]
MyData_reduced <- MyData_reduced[complete.cases(MyData_reduced[ ,30]),]
MyData_reduced <- MyData_reduced[complete.cases(MyData_reduced[ ,34]),]

MyData_reduced_2 <- MyData_reduced[!duplicated(MyData_reduced$name),]


MyData_reduced_2$relative_ETR <- (MyData_reduced_2$estimated_tonnes_reduced / MyData_reduced_2$baseline_emissions)*100

Diff_numerator <- 2018 - as.numeric(as.character(MyData_reduced_2$baseline_year))

Diff_year <- (as.numeric(as.character(MyData_reduced_2$target_year)) - as.numeric(as.character(MyData_reduced_2$baseline_year)))

MyData_reduced_2$PRT_Per_Year <- as.numeric(as.character(MyData_reduced_2$percent_reduction)) * (Diff_numerator / Diff_year)

plot(MyData_reduced_2$PRT_Per_Year, MyData_reduced_2$relative_ETR)

MyData_reduced_2_removeoutlier <- MyData_reduced_2[MyData_reduced_2$relative_ETR < 100,]

plot(MyData_reduced_2_removeoutlier$PRT_Per_Year, MyData_reduced_2_removeoutlier$relative_ETR, xlab = 'Percentage Target by 2018', ylab = 'Percentage achieved by 2018', ylim = c(0,100), xlim = c(0,100), main = 'Percentage achieved by 2018 vs Percentage Target by 2018', pch = 20)

linear_regression_model <- lm(relative_ETR ~ PRT_Per_Year, data = MyData_reduced_2_removeoutlier)

summary(linear_regression_model)

abline(linear_regression_model)
abline(a = 0, b = 1, col = 'Blue')

MyData_reduced_2_removeoutlier$value_of_m <- MyData_reduced_2_removeoutlier$relative_ETR / MyData_reduced_2_removeoutlier$PRT_Per_Year

write.csv(MyData_reduced_2_removeoutlier, file ='Cleaned Commitments with M values.csv')


cleaned_csv <- read.csv('Cleaned Commitments with M values.csv')
cleaned_csv_underachievers <- cleaned_csv[cleaned_csv$value_of_m < 1,]
cleaned_csv_overachievers <- cleaned_csv[cleaned_csv$value_of_m >= 1,]

##Interpretation

## For every 1 percent increase in the target reduction per year, there is a 0.8 percent increase in achieved reduction. We can then infer that big goals do lead to big achievements

##Print out common good names for overachievers and common bad names for underachievers

con_string <-  paste(cleaned_csv_overachievers$raw_commitment, collapse = ' ')
write.table(con_string, file = "overachievers_string.txt", sep = "\t",
            row.names = FALSE)

con_string2 <-  paste(cleaned_csv_underachievers$raw_commitment, collapse = ' ')
write.table(con_string2, file = "underachievers_string.txt", sep = "\t",
            row.names = FALSE)

install.packages("stringr")
library(stringr)

for(i in 1:nrow(cleaned_csv)){
  if(cleaned_csv$value_of_m[i] >= 1){
    cleaned_csv$overachieving_binary[i] <- 1
  }
  else{
    cleaned_csv$overachieving_binary[i] <- 0
  }
}

write.csv(cleaned_csv, file ='Updated Commitments.csv')
warnings()

for(i in 1:nrow(cleaned_csv)){
  if(str_detect(cleaned_csv$raw_commitment[i], "energy")){
    cleaned_csv$energy_binary[i] <- 1
  }
  else{
    cleaned_csv$energy_binary[i] <- 0
  }
}

cleaned_csv_updated <- read.csv('cleaned_csv.csv')

overachieve_logistic<- glm (overachieving_binary ~ binary_energy + binary_renewable + binary_production + binary_transport + binary_waste + binary_consumption + binary_emission, data= cleaned_csv_updated, family=binomial(link="logit")) 
summary(overachieve_logistic)

library(ROCR)
pred = predict(overachieve_logistic, type = 'response')
predObj = prediction (pred, cleaned_csv_updated$overachieving_binary)
rocObj = performance (predObj, measure = 'tpr', x.measure = 'fpr')
aucObj = performance(predObj, ,measure  = 'auc')
plot(rocObj, main = paste("Area under the curve:", round(aucObj@y.values[[1]],4)))

cleaned_csv_updated_removeX<- cleaned_csv_updated[,-c(1:3)]

