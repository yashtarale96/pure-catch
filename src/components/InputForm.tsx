import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { MapPin, Calculator, Loader as Loader2 } from 'lucide-react';

interface InputFormProps {
  onCalculate: (data: any) => void;
  isCalculating: boolean;
}

export default function InputForm({ onCalculate, isCalculating }: InputFormProps) {
  const [formData, setFormData] = useState({
    roofArea: '',
    location: '',
    roofType: '',
    annualRainfall: ''
  });
  const [step, setStep] = useState(1);
  const totalSteps = 4;

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    }
  };

  const handlePrevious = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleSubmit = () => {
    const data = {
      roofArea: parseFloat(formData.roofArea),
      location: formData.location,
      roofType: formData.roofType,
      annualRainfall: parseFloat(formData.annualRainfall)
    };
    onCalculate(data);
  };

  const isStepValid = () => {
    switch (step) {
      case 1:
        return formData.roofArea && parseFloat(formData.roofArea) > 0;
      case 2:
        return formData.location.length > 0;
      case 3:
        return formData.roofType.length > 0;
      case 4:
        return formData.annualRainfall && parseFloat(formData.annualRainfall) > 0;
      default:
        return false;
    }
  };

  const progress = step / totalSteps * 100;

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calculator className="h-5 w-5 text-primary" />
          Rainwater Harvesting Calculator
        </CardTitle>
        <CardDescription>
          Enter your property details to calculate potential water savings
        </CardDescription>
        <div className="space-y-2">
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>Step {step} of {totalSteps}</span>
            <span>{Math.round(progress)}% Complete</span>
          </div>
          <Progress value={progress} className="w-full" />
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {step === 1 &&
        <div className="space-y-4">
            <div className="text-center">
              <h3 className="text-lg font-semibold mb-2">Roof Area</h3>
              <p className="text-muted-foreground">Enter the total catchment area of your roof</p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="roofArea">Roof Area (square feet)</Label>
              <Input
              id="roofArea"
              type="number"
              placeholder="e.g., 2000"
              value={formData.roofArea}
              onChange={(e) => handleInputChange('roofArea', e.target.value)}
              className="text-center text-lg" />

              <p className="text-xs text-muted-foreground">
                Measure the horizontal area of your roof, not the sloped area
              </p>
            </div>
          </div>
        }

        {step === 2 &&
        <div className="space-y-4">
            <div className="text-center">
              <h3 className="text-lg font-semibold mb-2 flex items-center justify-center gap-2">
                <MapPin className="h-5 w-5" />
                Location
              </h3>
              <p className="text-muted-foreground">Enter your city or zip code</p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="location">City or Zip Code</Label>
              <Input
              id="location"
              placeholder="e.g., Seattle, WA or 98101"
              value={formData.location}
              onChange={(e) => handleInputChange('location', e.target.value)}
              className="text-center text-lg" />

              <p className="text-xs text-muted-foreground">
                We'll use this to estimate local rainfall data
              </p>
            </div>
          </div>
        }

        {step === 3 &&
        <div className="space-y-4">
            <div className="text-center">
              <h3 className="text-lg font-semibold mb-2">Roof Type</h3>
              <p className="text-muted-foreground">Select your roof material type</p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="roofType">Roof Material</Label>
              <Select value={formData.roofType} onValueChange={(value) => handleInputChange('roofType', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select roof type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="metal">Metal Roof (95% efficiency)</SelectItem>
                  <SelectItem value="tile">Tile Roof (85% efficiency)</SelectItem>
                  <SelectItem value="asphalt">Asphalt Shingles (75% efficiency)</SelectItem>
                  <SelectItem value="other">Other Material (70% efficiency)</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground">
                Different materials have different water collection efficiencies
              </p>
            </div>
          </div>
        }

        {step === 4 &&
        <div className="space-y-4">
            <div className="text-center">
              <h3 className="text-lg font-semibold mb-2">Annual Rainfall</h3>
              <p className="text-muted-foreground">Enter your area's average annual rainfall</p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="annualRainfall">Annual Rainfall (inches)</Label>
              <Input
              id="annualRainfall"
              type="number"
              placeholder="e.g., 37.5"
              value={formData.annualRainfall}
              onChange={(e) => handleInputChange('annualRainfall', e.target.value)}
              className="text-center text-lg" />

              <p className="text-xs text-muted-foreground">
                You can find this data from local weather services or online
              </p>
            </div>
          </div>
        }

        <div className="flex justify-between pt-4">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={step === 1}>

            Previous
          </Button>

          {step < totalSteps ?
          <Button
            onClick={handleNext}
            disabled={!isStepValid()}>

              Next
            </Button> :

          <Button
            onClick={handleSubmit}
            disabled={!isStepValid() || isCalculating}>

              {isCalculating ?
            <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Calculating...
                </> :

            'Calculate Results'
            }
            </Button>
          }
        </div>
      </CardContent>
    </Card>);

}