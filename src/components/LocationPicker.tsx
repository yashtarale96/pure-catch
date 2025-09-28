import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, Cloud, Thermometer, Wind, Eye } from 'lucide-react';

interface LocationPickerProps {
  location: string;
}

export default function LocationPicker({ location }: LocationPickerProps) {
  // Mock weather data - in a real app, this would come from a weather API
  const weatherData = {
    averageRainfall: 37.5,
    rainyDays: 152,
    temperature: 65,
    humidity: 68,
    windSpeed: 8.2,
    visibility: 10
  };

  const monthlyRainfall = [
    { month: 'Jan', rainfall: 5.2 },
    { month: 'Feb', rainfall: 3.8 },
    { month: 'Mar', rainfall: 3.1 },
    { month: 'Apr', rainfall: 2.4 },
    { month: 'May', rainfall: 1.8 },
    { month: 'Jun', rainfall: 1.2 },
    { month: 'Jul', rainfall: 0.8 },
    { month: 'Aug', rainfall: 1.1 },
    { month: 'Sep', rainfall: 1.9 },
    { month: 'Oct', rainfall: 3.4 },
    { month: 'Nov', rainfall: 6.1 },
    { month: 'Dec', rainfall: 6.7 }
  ];

  const maxRainfall = Math.max(...monthlyRainfall.map(m => m.rainfall));

  return (
    <div className="space-y-6">
      {/* Location Info */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5 text-primary" />
            Location Analysis: {location}
          </CardTitle>
          <CardDescription>
            Climate data and rainfall patterns for your area
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <Cloud className="h-8 w-8 text-blue-500 mx-auto mb-2" />
              <p className="text-2xl font-bold text-blue-600">{weatherData.averageRainfall}"</p>
              <p className="text-sm text-muted-foreground">Annual Rainfall</p>
            </div>
            <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <Thermometer className="h-8 w-8 text-green-500 mx-auto mb-2" />
              <p className="text-2xl font-bold text-green-600">{weatherData.temperature}°F</p>
              <p className="text-sm text-muted-foreground">Avg Temperature</p>
            </div>
            <div className="text-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
              <Wind className="h-8 w-8 text-purple-500 mx-auto mb-2" />
              <p className="text-2xl font-bold text-purple-600">{weatherData.rainyDays}</p>
              <p className="text-sm text-muted-foreground">Rainy Days/Year</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Monthly Rainfall Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Monthly Rainfall Distribution</CardTitle>
          <CardDescription>
            Average rainfall by month for optimal system planning
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {monthlyRainfall.map((month, index) => (
              <div key={index} className="flex items-center gap-4">
                <div className="w-12 text-sm font-medium">{month.month}</div>
                <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-6 relative">
                  <div 
                    className="bg-gradient-to-r from-blue-400 to-blue-600 h-6 rounded-full flex items-center justify-end pr-2"
                    style={{ width: `${(month.rainfall / maxRainfall) * 100}%` }}
                  >
                    <span className="text-white text-xs font-medium">
                      {month.rainfall}"
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Climate Insights */}
      <Card>
        <CardHeader>
          <CardTitle>Climate Insights</CardTitle>
          <CardDescription>
            Key factors affecting your rainwater harvesting potential
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-muted rounded-lg">
              <h4 className="font-semibold mb-2">Peak Collection Season</h4>
              <p className="text-sm text-muted-foreground">
                November through February offers the highest rainfall potential, 
                accounting for 65% of annual precipitation.
              </p>
              <Badge className="mt-2">Winter Months</Badge>
            </div>
            <div className="p-4 bg-muted rounded-lg">
              <h4 className="font-semibold mb-2">Dry Season Planning</h4>
              <p className="text-sm text-muted-foreground">
                July and August have minimal rainfall. Plan storage capacity 
                to bridge these dry periods effectively.
              </p>
              <Badge variant="outline" className="mt-2">Summer Storage</Badge>
            </div>
          </div>

          <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <h4 className="font-semibold mb-2 flex items-center gap-2">
              <Eye className="h-4 w-4" />
              Optimization Recommendations
            </h4>
            <ul className="text-sm space-y-1 text-muted-foreground">
              <li>• Install first-flush diverters to improve water quality</li>
              <li>• Consider larger storage during peak months (Nov-Feb)</li>
              <li>• Plan for 2-3 month storage capacity for dry season</li>
              <li>• Regular maintenance before peak rainfall season</li>
            </ul>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>
              <span className="text-muted-foreground">Humidity:</span>
              <p className="font-medium">{weatherData.humidity}%</p>
            </div>
            <div>
              <span className="text-muted-foreground">Wind Speed:</span>
              <p className="font-medium">{weatherData.windSpeed} mph</p>
            </div>
            <div>
              <span className="text-muted-foreground">Visibility:</span>
              <p className="font-medium">{weatherData.visibility} miles</p>
            </div>
            <div>
              <span className="text-muted-foreground">Collection Efficiency:</span>
              <p className="font-medium">85%</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}