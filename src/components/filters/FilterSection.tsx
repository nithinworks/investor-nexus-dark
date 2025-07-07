
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { X } from 'lucide-react';

interface FilterSectionProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  selectedCountry: string;
  setSelectedCountry: (country: string) => void;
  selectedType: string;
  setSelectedType: (type: string) => void;
  selectedStage: string;
  setSelectedStage: (stage: string) => void;
  selectedTags: string[];
  setSelectedTags: (tags: string[]) => void;
  availableTags: string[];
  countries: string[];
}

const FilterSection = ({
  searchTerm,
  setSearchTerm,
  selectedCountry,
  setSelectedCountry,
  selectedType,
  setSelectedType,
  selectedStage,
  setSelectedStage,
  selectedTags,
  setSelectedTags,
  availableTags,
  countries,
}: FilterSectionProps) => {
  const investmentTypes = ['VC', 'Angel', 'Family Office', 'Corporate'];
  const investmentStages = ['Pre-Seed', 'Seed', 'Series A', 'Series B', 'Series C+', 'Growth'];

  const addTag = (tag: string) => {
    if (!selectedTags.includes(tag)) {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const removeTag = (tagToRemove: string) => {
    setSelectedTags(selectedTags.filter(tag => tag !== tagToRemove));
  };

  const clearAllFilters = () => {
    setSearchTerm('');
    setSelectedCountry('');
    setSelectedType('');
    setSelectedStage('');
    setSelectedTags([]);
  };

  return (
    <div className="bg-gray-900 rounded-lg p-6 border border-gray-800 space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-white">Filters</h3>
        <Button
          onClick={clearAllFilters}
          variant="ghost"
          size="sm"
          className="text-gray-400 hover:text-white"
        >
          Clear All
        </Button>
      </div>

      <div className="space-y-4">
        <div>
          <Label htmlFor="search" className="text-white">Search</Label>
          <Input
            id="search"
            type="text"
            placeholder="Search investors..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-gray-800 border-gray-700 text-white mt-1"
          />
        </div>

        <div>
          <Label className="text-white">Country</Label>
          <Select value={selectedCountry} onValueChange={setSelectedCountry}>
            <SelectTrigger className="bg-gray-800 border-gray-700 text-white mt-1">
              <SelectValue placeholder="Select country" />
            </SelectTrigger>
            <SelectContent className="bg-gray-800 border-gray-700">
              <SelectItem value=" ">All Countries</SelectItem>
              {countries.map((country) => (
                <SelectItem key={country} value={country} className="text-white">
                  {country}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label className="text-white">Investment Type</Label>
          <Select value={selectedType} onValueChange={setSelectedType}>
            <SelectTrigger className="bg-gray-800 border-gray-700 text-white mt-1">
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent className="bg-gray-800 border-gray-700">
              <SelectItem value=" ">All Types</SelectItem>
              {investmentTypes.map((type) => (
                <SelectItem key={type} value={type} className="text-white">
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label className="text-white">Investment Stage</Label>
          <Select value={selectedStage} onValueChange={setSelectedStage}>
            <SelectTrigger className="bg-gray-800 border-gray-700 text-white mt-1">
              <SelectValue placeholder="Select stage" />
            </SelectTrigger>
            <SelectContent className="bg-gray-800 border-gray-700">
              <SelectItem value=" ">All Stages</SelectItem>
              {investmentStages.map((stage) => (
                <SelectItem key={stage} value={stage} className="text-white">
                  {stage}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label className="text-white">Tags</Label>
          <div className="mt-2 space-y-2">
            <Select onValueChange={addTag}>
              <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                <SelectValue placeholder="Add tags" />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 border-gray-700">
                {availableTags
                  .filter(tag => !selectedTags.includes(tag))
                  .map((tag) => (
                    <SelectItem key={tag} value={tag} className="text-white">
                      {tag}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
            
            {selectedTags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {selectedTags.map((tag) => (
                  <Badge
                    key={tag}
                    variant="secondary"
                    className="bg-blue-600 text-white flex items-center gap-1"
                  >
                    {tag}
                    <X
                      className="h-3 w-3 cursor-pointer"
                      onClick={() => removeTag(tag)}
                    />
                  </Badge>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterSection;
