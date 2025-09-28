import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { DollarSign, TrendingUp, Calculator, PiggyBank } from 'lucide-react';

interface CostAnalysisProps {
  data: {
    harvestableWater: number;
    storageRecommendation: number;
    totalCost: number;
    roi: number;
    paybackPeriod: number;
  };
}

export default function CostAnalysis({ data }: CostAnalysisProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat().format(num);
  };

  // Calculate breakdown
  const tankCost = data.storageRecommendation * 150;
  const installationCost = 2500;
  const annualSavings = data.harvestableWater * 0.004 * 365;
  const maintenanceCost = data.totalCost * 0.02; // 2% annually

  const costBreakdown = [
    { item: 'Storage Tank', cost: tankCost, description: `${data.storageRecommendation} gallon capacity` },
    { item: 'Installation & Setup', cost: installationCost, description: 'Professional installation' },
    { item: 'Permits & Misc', cost: data.totalCost - tankCost - installationCost, description: 'Permits, pipes, filters' }
  ];

  const savingsBreakdown = [
    { item: 'Water Bill Reduction', amount: annualSavings, description: 'Based on local water rates' },
    { item: 'Maintenance Cost', amount: -maintenanceCost, description: 'Annual system maintenance' },
    { item: 'Net Annual Savings', amount: annualSavings - maintenanceCost, description: 'After maintenance costs' }
  ];

  return (
    <div className="space-y-6">
      {/* Cost Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <DollarSign className="h-5 w-5 text-primary" />
            Initial Investment Breakdown
          </CardTitle>
          <CardDescription>
            Detailed cost analysis for your rainwater harvesting system
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {costBreakdown.map((item, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                <div>
                  <p className="font-medium">{item.item}</p>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </div>
                <Badge variant="secondary" className="text-lg px-3 py-1">
                  {formatCurrency(item.cost)}
                </Badge>
              </div>
            ))}
            <Separator />
            <div className="flex items-center justify-between p-3 bg-primary/10 rounded-lg">
              <div>
                <p className="font-bold text-lg">Total Investment</p>
                <p className="text-sm text-muted-foreground">Complete system cost</p>
              </div>
              <Badge className="text-xl px-4 py-2 bg-primary text-primary-foreground">
                {formatCurrency(data.totalCost)}
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Savings Analysis */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <PiggyBank className="h-5 w-5 text-green-600" />
            Annual Savings Analysis
          </CardTitle>
          <CardDescription>
            Expected yearly savings and costs
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {savingsBreakdown.map((item, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                <div>
                  <p className="font-medium">{item.item}</p>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </div>
                <Badge 
                  variant={item.amount >= 0 ? "default" : "destructive"}
                  className="text-lg px-3 py-1"
                >
                  {item.amount >= 0 ? '+' : ''}{formatCurrency(item.amount)}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* ROI Timeline */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-blue-600" />
            Return on Investment Timeline
          </CardTitle>
          <CardDescription>
            Projected financial returns over time
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <p className="text-2xl font-bold text-blue-600">{data.paybackPeriod}</p>
                <p className="text-sm text-muted-foreground">Years to Break Even</p>
              </div>
              <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <p className="text-2xl font-bold text-green-600">{data.roi}%</p>
                <p className="text-sm text-muted-foreground">Annual ROI</p>
              </div>
              <div className="text-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                <p className="text-2xl font-bold text-purple-600">
                  {formatCurrency((annualSavings - maintenanceCost) * 10)}
                </p>
                <p className="text-sm text-muted-foreground">10-Year Savings</p>
              </div>
            </div>

            <Separator />

            <div className="space-y-3">
              <h4 className="font-semibold">Key Financial Metrics</h4>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">Water Harvested:</span>
                  <p className="font-medium">{formatNumber(data.harvestableWater)} gallons/year</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Cost per Gallon:</span>
                  <p className="font-medium">${(data.totalCost / (data.harvestableWater * 10)).toFixed(3)}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Monthly Savings:</span>
                  <p className="font-medium">{formatCurrency((annualSavings - maintenanceCost) / 12)}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">System Lifespan:</span>
                  <p className="font-medium">20+ years</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Comparison Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calculator className="h-5 w-5 text-orange-600" />
            Cost Comparison
          </CardTitle>
          <CardDescription>
            Compare rainwater harvesting vs. municipal water costs
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2">Scenario</th>
                  <th className="text-right p-2">Year 1</th>
                  <th className="text-right p-2">Year 5</th>
                  <th className="text-right p-2">Year 10</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="p-2 font-medium">Municipal Water Only</td>
                  <td className="text-right p-2">{formatCurrency(annualSavings)}</td>
                  <td className="text-right p-2">{formatCurrency(annualSavings * 5 * 1.03)}</td>
                  <td className="text-right p-2">{formatCurrency(annualSavings * 10 * 1.06)}</td>
                </tr>
                <tr className="border-b">
                  <td className="p-2 font-medium">With Rainwater System</td>
                  <td className="text-right p-2">{formatCurrency(data.totalCost + maintenanceCost)}</td>
                  <td className="text-right p-2">{formatCurrency(data.totalCost + (maintenanceCost * 5))}</td>
                  <td className="text-right p-2">{formatCurrency(data.totalCost + (maintenanceCost * 10))}</td>
                </tr>
                <tr className="bg-green-50 dark:bg-green-900/20">
                  <td className="p-2 font-bold">Total Savings</td>
                  <td className="text-right p-2 font-bold text-green-600">
                    {formatCurrency(annualSavings - data.totalCost - maintenanceCost)}
                  </td>
                  <td className="text-right p-2 font-bold text-green-600">
                    {formatCurrency((annualSavings * 5 * 1.03) - (data.totalCost + (maintenanceCost * 5)))}
                  </td>
                  <td className="text-right p-2 font-bold text-green-600">
                    {formatCurrency((annualSavings * 10 * 1.06) - (data.totalCost + (maintenanceCost * 10)))}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}