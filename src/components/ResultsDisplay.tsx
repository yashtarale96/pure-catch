import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Droplet, TrendingUp, DollarSign, Calendar1 as Calendar, Target, Gauge } from 'lucide-react';

interface ResultsDisplayProps {
  data: {
    roofArea: number;
    location: string;
    roofType: string;
    annualRainfall: number;
    harvestableWater: number;
    storageRecommendation: number;
    totalCost: number;
    roi: number;
    paybackPeriod: number;
  };
}

export default function ResultsDisplay({ data }: ResultsDisplayProps) {
  const formatNumber = (num: number) => {
    return new Intl.NumberFormat().format(num);
  };

  const getROIColor = (roi: number) => {
    if (roi >= 15) return 'bg-green-500';
    if (roi >= 10) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 border-blue-200 dark:border-blue-800">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-600 dark:text-blue-400">Annual Water Harvest</p>
                <p className="text-2xl font-bold text-blue-900 dark:text-blue-100">
                  {formatNumber(data.harvestableWater)}
                </p>
                <p className="text-xs text-blue-600 dark:text-blue-400">gallons per year</p>
              </div>
              <Droplet className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 border-green-200 dark:border-green-800">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-600 dark:text-green-400">Storage Needed</p>
                <p className="text-2xl font-bold text-green-900 dark:text-green-100">
                  {formatNumber(data.storageRecommendation)}
                </p>
                <p className="text-xs text-green-600 dark:text-green-400">gallons capacity</p>
              </div>
              <Target className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 border-purple-200 dark:border-purple-800">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-purple-600 dark:text-purple-400">Total Investment</p>
                <p className="text-2xl font-bold text-purple-900 dark:text-purple-100">
                  ${formatNumber(data.totalCost)}
                </p>
                <p className="text-xs text-purple-600 dark:text-purple-400">initial cost</p>
              </div>
              <DollarSign className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 border-orange-200 dark:border-orange-800">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-orange-600 dark:text-orange-400">Payback Period</p>
                <p className="text-2xl font-bold text-orange-900 dark:text-orange-100">
                  {data.paybackPeriod}
                </p>
                <p className="text-xs text-orange-600 dark:text-orange-400">years</p>
              </div>
              <Calendar className="h-8 w-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Results */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Gauge className="h-5 w-5 text-primary" />
            Detailed Analysis
          </CardTitle>
          <CardDescription>
            Complete breakdown of your rainwater harvesting potential
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Input Summary */}
          <div>
            <h4 className="font-semibold mb-3">Input Parameters</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div>
                <span className="text-muted-foreground">Roof Area:</span>
                <p className="font-medium">{formatNumber(data.roofArea)} sq ft</p>
              </div>
              <div>
                <span className="text-muted-foreground">Location:</span>
                <p className="font-medium">{data.location}</p>
              </div>
              <div>
                <span className="text-muted-foreground">Roof Type:</span>
                <p className="font-medium capitalize">{data.roofType}</p>
              </div>
              <div>
                <span className="text-muted-foreground">Annual Rainfall:</span>
                <p className="font-medium">{data.annualRainfall} inches</p>
              </div>
            </div>
          </div>

          <Separator />

          {/* ROI Analysis */}
          <div>
            <h4 className="font-semibold mb-3 flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              Return on Investment
            </h4>
            <div className="flex items-center gap-4">
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-muted-foreground">ROI Percentage</span>
                  <Badge className={`${getROIColor(data.roi)} text-white`}>
                    {data.roi}%
                  </Badge>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full ${getROIColor(data.roi)}`}
                    style={{ width: `${Math.min(data.roi, 100)}%` }}>
                  </div>
                </div>
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              {data.roi >= 15 ? 'Excellent' : data.roi >= 10 ? 'Good' : 'Fair'} return on investment
            </p>
          </div>

          <Separator />

          {/* Calculation Formula */}
          <div>
            <h4 className="font-semibold mb-3">Calculation Method</h4>
            <div className="bg-muted p-4 rounded-lg text-sm space-y-2">
              <p><strong>Harvestable Water Formula:</strong></p>
              <p className="font-mono text-xs">
                Roof Area × Annual Rainfall × Runoff Coefficient × 0.623 ÷ 1000
              </p>
              <p className="text-muted-foreground">
                Where runoff coefficient varies by roof material (Metal: 0.95, Tile: 0.85, Asphalt: 0.75)
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>);

}