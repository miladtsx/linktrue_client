import { useState, useEffect, useImperativeHandle, forwardRef } from "react";
import Select from "react-select";
import { useGlobalState, Web3Item } from "@/context/GlobalStateContext";

const Web3ItemsComboBox = forwardRef(({ onSelect }, ref) => {
  const [icons, setIcons] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedOption, setSelectedOption] = useState(null);

  const {
    userProfile,
  } = useGlobalState();

  useEffect(() => {
    // Load icons if userProfile.web3Items exists
    if (userProfile && userProfile.web3Items) {
      const userWeb3Items = userProfile.web3Items.map((item) => ({
        label: item.icon.split('/').pop().replace('.svg', ''),
        value: item.icon,
      }));
      setIcons(userWeb3Items);
    }
  }, [userProfile]);

  const handleChange = (option) => {
    setSelectedOption(option);
    if (onSelect) {
      const filteredItem = userProfile.web3Items.filter(i => i.icon === option?.value);
      if (filteredItem[0]?.walletAddress?.length > 0) {
        onSelect(filteredItem[0]);
      } else {
        onSelect({
          walletAddress: '',
          title: ''
        });
      }
    }
  };

  const clearSelection = () => {
    setSelectedOption(null);
  };

  useImperativeHandle(ref, () => ({
    clearSelection,
  }));

  const options = icons.filter((icon) =>
    icon.label.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <Select
        value={selectedOption}
        options={options}
        onInputChange={(inputValue) => setSearch(inputValue)}
        onChange={handleChange}
        getOptionLabel={(option) => (
          <div style={{ display: "flex", alignItems: "center" }}>
            <img
              src={option.value}
              alt={option.label}
              style={{ width: 20, marginRight: 10 }}
            />
            {option.label}
          </div>
        )}
        placeholder={`Choose wallet address`}
        isClearable
      />
    </div>
  );
});

export default Web3ItemsComboBox;
